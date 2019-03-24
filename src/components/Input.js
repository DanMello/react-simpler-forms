import React, { Component } from 'react'
import { validator, isEmpty } from '../helpers/validators'

class Input extends Component {

  constructor () {

    super()

    this.state = {
      checkbox: {},
      radio: {}
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onChangeSelection = this.onChangeSelection.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentDidUpdate(prevProps) {

    if (this.props.value === this.state.checkbox.value && this.props.value !== undefined && this.state.checkbox.value !== undefined) {

      if (prevProps.form.data[this.props.name]) {

        let array = prevProps.form.data[this.props.name].values
        let currentItemArray = array.filter(item => item.value === this.state.checkbox.value)

        if (currentItemArray.length === 0) {

          let newArray = [...array]

          newArray.push(this.state.checkbox)

          let payload = {
            property: this.props.name,
            values: newArray
          }

          this.props.updateform('updateData', payload)
        }
      }
    }

    if (this.props.name === this.state.radio.property && this.props.name !== undefined && this.state.radio.property !== undefined) {

      if (prevProps.form.data[this.props.name]) {

        if (prevProps.form.data[this.props.name].checked !== this.state.radio.checked) {

          let payload = {
            property: this.props.name,
            checked: true,
            value: this.state.radio.value
          }

          this.props.updateform('updateData', payload)
        }
      }
    }
  }

  componentDidMount() {

    if (typeof this.props.name !== 'string') {

      console.error(
        "Input prop 'name' is required and must be a string.\n",
        "Example: name='first_name'"
      );
    }

    if (!Array.isArray(this.props.validators) && this.props.type !== 'select' && this.props.type !== 'radio' && this.props.type !== 'textarea' && this.props.type !== 'checkbox') {

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
        step: this.props.form.step,
        error: null,
        property: this.props.name,
        focused: false,
        value: null,
        validators: this.props.validators
      }

      if (this.props.type === 'checkbox') {

        delete payload.value
        delete payload.validators

        let checkbox = {
          value: this.props.value
        }

        if (this.props.required) {

          checkbox.required = true
        }

        if (this.props.checked) {

          checkbox.checked = true

        } else {

          checkbox.checked = false
        }

        payload.values = []
        payload.error = false

        this.setState({
          checkbox: checkbox
        }, () => {

          this.forceUpdate()
        })
      }

      if (this.props.type === 'radio') {

        delete payload.validators

        if (this.props.required) {

          payload.required = true
        }

        if (this.props.checked) {
          
          this.setState({
            radio: {
              value: this.props.value,
              property: this.props.name,
              checked: true
            }
          }, () => {

            this.forceUpdate()
          })
        }

        payload.checked = false
        payload.error = false
      }

      if (this.props.type === 'select') {

        delete payload.validators

        if (this.props.required) {

          payload.required = true
        }

        payload.error = false
      }

      if (this.props.type === 'textarea') {

        if (!this.props.validators) {

          delete payload.validators
        }
      }

      if (this.props.delayError) {

        payload.typingDelay = null
        payload.typing = false
      }

      if (this.props.query) {

        payload.typing = false
        payload.query = true
        payload.queryVerified = false
        payload.queryResponse = null
        payload.queryDelay = null
      }

      if (this.props.match) {

        payload.match = this.props.match
      }

      this.props.updateform('updateData', payload)
    }
  }

  onChangeInput (e) {

    let payload = {
      value: e.target.value,
      property: this.props.name
    }

    if (this.props.form.data[this.props.name].queryDelay) {

      clearTimeout(this.props.form.data[this.props.name].queryDelay)

      payload.queryDelay = null
    }

    if (this.props.form.data[this.props.name].typingDelay) {

      clearTimeout(this.props.form.data[this.props.name].typingDelay)

      payload.typing = false
      payload.typingDelay = null
    }

    if (this.props.validators) {

      payload.error = validator(this.props.validators, e.target.value)
    }

    if (this.props.delayError && payload.error) {

      payload.typing = true

      payload.typingDelay = setTimeout(() => {

        this.props.updateform('updateData', {property: this.props.name, typing: false})

      }, this.props.delayError)
    }

    if (this.props.query) {

      payload.queryVerified = false
      payload.queryResponse = null

      if (!payload.error) {

        payload.typing = false

        payload.queryDelay = setTimeout(() => {

          let value = this.props.form.data[this.props.name].value

          let payload = {
            data: { [this.props.name]: value },
            url: this.props.query,
            cancelable: true,
            property: this.props.name
          }

          this.props.updateform('queryData', payload)

        }, 350)
      }
    }

    this.props.updateform('updateData', payload)
  }

  onChangeSelection (e) {

    let formInput = this.props.form.data[this.props.name]

    let payload = {
      property: this.props.name,
      value: this.props.value || e.target.value,
      error: false
    }

    if (this.props.type === 'radio') {

      payload.checked = true
    }

    if (this.props.type === 'select' && payload.value === '') {

      payload.error = true
    }

    if (this.props.type === 'checkbox') {

      delete payload.value

      let currentArray = [...formInput.values]
      let currentItem = currentArray.filter(item => item.value === this.props.value)
      let indexOf = currentArray.indexOf(currentItem[0])
      
      currentArray[indexOf].checked = !currentArray[indexOf].checked

      let allrequiredTrue = currentArray.filter(item => item.required).every(item => item.checked === true)

      if (!allrequiredTrue) {

        payload.error = true
      } 


      payload.values = currentArray
    }

    this.props.updateform('updateData', payload)
  }

  onFocus () {

    let payload = {
      property: this.props.name,
      focused: true
    }

    this.props.updateform('updateData', payload)
  }

  onBlur() {

    if (this.props.scrollUp) {
      
      window.scroll(0,0)
    }

    let payload = {
      property: this.props.name,
      focused: false
    }

    this.props.updateform('updateData', payload)
  }

  render () {

    let { name, delayError, match, validators, query, focusedClassName, errorClassName, form, className, scrollUp, updateform, ...rest} = this.props
    let input = this.props.form.data[this.props.name]
    let error, typing, value, inputType, classNames, checked, focused

    if (input) {

      if (this.props.type === 'checkbox') {

        let currentInput = input.values.filter(item => item.value === this.props.value)

        if (currentInput.length > 0) {

          value = currentInput[0].value
          checked = currentInput[0].checked
        }

      } else {

        value = input.value
        checked = input.checked
      }

      focused = input.focused
      error = input.error
      typing = input.typing
    }

    if (focused && (!error || typing)) {

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
          onChange={(this.props.type !== 'radio' && this.props.type !== 'checkbox') ? this.onChangeInput : this.onChangeSelection}
          checked={(this.props.type === 'radio' || this.props.type === 'checkbox') && value === this.props.value && checked ? checked : false}
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