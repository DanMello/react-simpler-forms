import React, { Component } from 'react';
import { validator } from '../helpers/validators';
import { query } from '../actions/ReduxSmartFormsActions'
import classNames from 'classnames'

export default class SmartInput extends Component {

  constructor () {

    super()

    this.state = {
      queryDelay: null,
      typingDelay: null,
      focused: false
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onChangeSelection = this.onChangeSelection.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentDidMount() {

    if (!this.props.form.data[this.props.name]) {

      let data = {
        value: '',
        step: this.props.form.step,
        error: null
      }

      if (this.props.type === 'radio' || this.props.type === 'select') {

        if (this.props.required) {

          data.required = true
          data.validators = [ {method: "notEmpty", error: true} ]
        }

      } else {

        data.validators = this.props.validators
      }

      if (this.props.query) {

        data.query = true
        data.queryVerified = false
        data.queryResponse = null
      }

      if (this.props.match) {

        data.match = this.props.match
      }

      this.props.dispatch({
        type: 'FORM_INPUT_CHANGE',
        payload: {
          property: this.props.name,
          data
        }
      })
    }
  }

  onChangeInput (e) {

    if (this.state.queryDelay) clearTimeout(this.state.queryDelay)
    if (this.state.typingDelay) clearTimeout(this.state.typingDelay)

    let data = {
      value: e.target.value,
      error: validator(this.props.validators, e.target.value)
    }

    if (this.props.delayError) {

      data.typing = true

      this.setState({
        typingDelay: setTimeout(() => {

          this.props.dispatch({
            type: 'FORM_INPUT_CHANGE',
            payload: {
              property: this.props.name,
              data: {
                typing: false
              }
            }
          })
        }, this.props.delayError)
      })
    }

    if (this.props.query && !data.error) {

      data.queryVerified = false
      data.queryResponse = null
      data.typing = false

      this.setState({
        queryDelay: setTimeout(() => {

          let value = this.props.form.data[this.props.name].value

          this.props.dispatch(query(this.props.name, value, this.props.query.url))

        }, 350)
      })
    }

    this.props.dispatch({
      type: 'FORM_INPUT_CHANGE',
      payload: {
        property: this.props.name,
        data
      }
    })
  }

  onChangeSelection (e) {

    let formInput = this.props.form.data[this.props.name]

    let data = {
      value: this.props.value || e.target.value
    }

    if (formInput.required === true) {

      data.error = validator(formInput.validators, data.value)
    }

    this.props.dispatch({
      type: 'FORM_INPUT_CHANGE',
      payload: {
        property: this.props.name,
        data
      }
    })
  }

  onFocus () {

    this.setState({
      focused: true
    })
  }

  onBlur() {

    if (this.props.scrollUp) {
      
      window.scroll(0,0)
    }

    this.setState({
      focused: false
    })
  }

  render () {

    let { name, delayError, match, validation, query, focusedClassName, errorClassName, dispatch, form, className, scrollUp, ...rest} = this.props
    let input = this.props.form.data[this.props.name]
    let value = ''
    let error, typing

    if (input) {

      // console.log('yoo', input)

      value = input.value
      error = input.error
      typing = input.typing
    }

    let formInputsClasses = classNames(
      [className],
      {
        [focusedClassName]: this.state.focused && (!error || typing),
        [errorClassName]: error && !typing
      }
    )

    let inputType

    if (this.props.type === 'textarea') {

      inputType = (
        <textarea
          {...rest}
          className={formInputsClasses}
          onChange={this.onChangeInput}
          onBlur={this.onBlur} 
          onFocus={this.onFocus}
          value={value}
        />
      )

    } else if (this.props.type === 'select') {

      inputType = (
        <select className={formInputsClasses} onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.onChangeSelection} value={value}>
          {this.props.options.map((item, i) => {

            return <option
                      key={item.value}
                      value={item.value}
                      className={i & 1 ? this.props.oddOptionClass : this.props.evenOptionClass}
                    >
                      {item.text}
                    </option>
          })}
        </select>
      )

    } else {

      inputType = (
        <input 
          {...rest}
          name={name}
          className={formInputsClasses}
          onChange={this.props.type !== 'radio' ? this.onChangeInput : this.onChangeSelection}
          value={value} 
          onBlur={this.onBlur} 
          onFocus={this.onFocus} 
        />
      )
    }

    return (inputType)
  }
}