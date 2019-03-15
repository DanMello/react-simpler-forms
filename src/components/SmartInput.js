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

    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentDidMount() {

    let data = {
      value: '',
      step: this.props.form.step,
      error: null
    }

    if (this.props.type === 'radio' && this.props.required) {

      data.required = true
      data.validators = { methods: [ {method: "notEmpty", error: true} ] }

    } else if (this.props.type !== 'radio') {

      data.validators = this.props.validation
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

  onChange (e) {

    if (this.state.queryDelay) clearTimeout(this.state.queryDelay)
    if (this.state.typingDelay) clearTimeout(this.state.typingDelay)

    let formDataInput = this.props.form.data[this.props.name]
    let data = {
      value: this.props.value || e.target.value
    }

    if (this.props.type === 'radio' && formDataInput.required === true) {

      data.error = validator(formDataInput.validators.methods, data.value)

    } else if (this.props.type !== 'radio') {

      data.error = validator(this.props.validation.methods, e.target.value)
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

          let value = formDataInput.value

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

    let { name, delayError, match, validation, query, focusedClassName, errorClassName, dispatch, form, className, scrollUp, textArea, ...rest} = this.props
    let input = this.props.form.data[this.props.name]
    let value = ''
    let error, typing

    if (input) {

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

    if (textArea) {

      inputType = <textarea {...rest} className={formInputsClasses} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} value={value}/>

    } else {

      inputType = <input {...rest} name={name} className={formInputsClasses} onChange={this.onChange} value={value} onBlur={this.onBlur} onFocus={this.onFocus} />
    }

    return (inputType)
  }
}