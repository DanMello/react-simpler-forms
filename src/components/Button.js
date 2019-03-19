import React, { Component } from 'react'
import { validator, allmatch } from '../helpers/validators'

export default class Button extends Component {

  constructor () {

    super()

    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.submit = this.submit.bind(this)
    this.onClick = this.onClick.bind(this)
    this.validateAllInputs = this.validateAllInputs.bind(this)
  }

  componentDidMount() {
    
    if (typeof this.props.type !== 'string') {

      console.error(
        "Button prop 'type' is required and must be a string.\n",
        "Valid Strings: \n",
        " type='prevStep'\n",
        " type='nextStep'\n",
        " type='submit'\n"
      );
    }
  }

  validateAllInputs() {

    let formData = this.props.form.data
    let step = this.props.form.step

    let payload = Object.keys(formData)
      .filter(property => formData[property].step === step)
      .filter(property => !!formData[property].validators)
      .reduce((acc, current) => ({
        ...acc,
        [current]: {
          ...formData[current],
          error: !formData[current].error ? validator(formData[current].validators, formData[current].value) : formData[current].error
        }
      }), {})

    let allpasstest = Object.keys(payload)
      .every(input => payload[input].error === false)

    let allInputsQueried = Object.keys(payload)
          .filter(property => payload[property].query)
          .every(property => payload[property].queryVerified === true)

    let allinputsMatch = allmatch(payload)

    if (!allpasstest || !allinputsMatch || !allInputsQueried) {

      this.props.updateform('updateMultiple', payload)

      return false

    } else {

      return true
    }
  }

  nextStep () {

    this.props.updateform('incrementStep')
  }

  prevStep () {

    this.props.updateform('decrementStep')
  }

  submit () {

    let formData = this.props.form.data

    let data = Object.keys(formData)
      .filter(property => formData[property].value !== '')
      .reduce((acc, current) => ({...acc, [current] : formData[current].value }), {})

    if (this.props.extraData) {

      data = {
        ...data,
        ...this.props.extraData
      }
    }

    let payload = {
      data: data,
      url: this.props.url,
      error: 'submitError'
    }

    if (this.props.success) {

      payload.success = this.props.success

    } else {

      payload.success = 'submitSuccess'
    }

    this.props.updateform('submitForm', payload)
  }

  onClick () {

    this.props.updateform('resetFormResponses')

    if (this.props.form.loading) return 

    if (this.props.type !== 'prevStep') {

      if (this.props.disabled === undefined) {

        let test = this.validateAllInputs()

        if (!test) return

      } else if (this.props.disabled === true) {

        return
      }
    }

    return this[this.props.type]()
  }

  render () {

    let className = this.props.disabled ? 
      [this.props.className, this.props.disabledClassName]
      :
      [this.props.className]

    return <div onClick={this.onClick} className={className.join(' ')}>
            {this.props.children}
           </div>
  }
}