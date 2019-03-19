import React, { Component } from 'react'
import { validator, isEmpty } from '../helpers/validators'

class Input extends Component {

  constructor () {

    super()

    this.state = {
      queryDelay: null,
      typingDelay: null,
      focused: false,
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onChangeSelection = this.onChangeSelection.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentDidMount() {

    if (typeof this.props.name !== 'string') {

      console.error(
        "Input prop 'name' is required and must be a string.\n",
        "Example: name='first_name'"
      );
    }

    if (!Array.isArray(this.props.validators) && this.props.type !== 'select' && this.props.type !== 'radio' && this.props.type !== 'textarea') {

      console.error(
        "Input prop 'validators' is required and must be an array.\n",
        "Example: \n",
        "validators={[method: 'notEmpty', error: 'Input cannot be empty.']}"
      );
    }

    if (!Array.isArray(this.props.options) && this.props.type === 'select') {

      console.error(
        "Input prop 'options' is required and must be an array.\n",
        "Example: \n",
        "options={[value: 'MA', text: 'Massachusetts']}"
      );
    }

    if (this.props.type === 'radio' && typeof this.props.value !== 'string') {
      
      console.error(
        "Input prop 'value' is required and must be a string.\n",
        "Example: value='red'"
      );
    }

    if (!this.props.form.data[this.props.name]) {

      let payload = {
        value: '',
        step: this.props.form.step,
        error: null,
        property: this.props.name
      }

      if (this.props.type === 'radio' || this.props.type === 'select') {

        if (this.props.required) {

          payload.required = true
          payload.validators = [ {method: "notEmpty", error: true} ]
        }

      } else {

        if (this.props.type !== 'textarea') {

          payload.validators = this.props.validators

        } else {

          if (!!this.props.validators) {
            
            payload.validators = this.props.validators            
          }
        }

      }

      if (this.props.query) {

        payload.query = true
        payload.queryVerified = false
        payload.queryResponse = null
      }

      if (this.props.match) {

        payload.match = this.props.match
      }

      this.props.updateform('updateData', payload)
    }
  }

  onChangeInput (e) {

    if (this.state.queryDelay) clearTimeout(this.state.queryDelay)
    if (this.state.typingDelay) clearTimeout(this.state.typingDelay)

    let payload = {
      value: e.target.value,
      property: this.props.name
    }

    if (this.props.validators) {

      payload.error = validator(this.props.validators, e.target.value)
    }

    if (this.props.delayError) {

      payload.typing = true

      this.setState({
        typingDelay: setTimeout(() => {

          this.props.updateform('updateData', {property: this.props.name, typing: false})

        }, this.props.delayError)
      })
    }

    if (this.props.query) {

      payload.queryVerified = false
      payload.queryResponse = null

      if (!payload.error) {

        payload.typing = false

        this.setState({
          queryDelay: setTimeout(() => {

            let value = this.props.form.data[this.props.name].value

            let payload = {
              data: { [this.props.name]: value },
              url: this.props.query,
              cancelable: true,
              property: this.props.name
            }

            this.props.updateform('queryData', payload)

          }, 350)
        })
      }
    }

    this.props.updateform('updateData', payload)
  }

  onChangeSelection (e) {

    let formInput = this.props.form.data[this.props.name]

    let payload = {
      value: this.props.value || e.target.value,
      property: this.props.name
    }

    if (this.props.type === 'radio') {

      payload.checked = true
    }

    if (formInput.required === true) {

      payload.error = validator(formInput.validators, payload.value)
    }

    this.props.updateform('updateData', payload)
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

    let { name, delayError, match, validators, query, focusedClassName, errorClassName, form, className, scrollUp, updateform, ...rest} = this.props
    let input = this.props.form.data[this.props.name]
    let error, typing, value, inputType, classNames, checked

    if (input) {

      checked = input.checked
      value = input.value
      error = input.error
      typing = input.typing
    }

    if (this.state.focused && (!error || typing)) {

      classNames = [className, focusedClassName]

    } else if (error && !typing) {

      classNames = [className, errorClassName]

    } else {

      classNames = [className]
    }

    if (this.props.type === 'textarea') {

      inputType = (
        <textarea
          {...rest}
          className={classNames.join(' ')}
          onChange={this.onChangeInput}
          onBlur={this.onBlur} 
          onFocus={this.onFocus}
          value={value ? value : ''}
        />
      )

    } else if (this.props.type === 'select') {

      inputType = (
        <select className={classNames.join(' ')} onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.onChangeSelection} value={value ? value : ''}>
          {Array.isArray(this.props.options) && this.props.options.map((item, i) => {

            return <option
                      key={item.value}
                      value={item.value}
                      selected={item.selected}
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
          className={classNames.join(' ')}
          onChange={this.props.type !== 'radio' ? this.onChangeInput : this.onChangeSelection}
          checked={this.props.type === 'radio' && value === this.props.value && checked ? checked : false}
          value={value ? value : ''} 
          onBlur={this.onBlur} 
          onFocus={this.onFocus} 
        />
      )
    }

    return (inputType)
  }
}

export default Input