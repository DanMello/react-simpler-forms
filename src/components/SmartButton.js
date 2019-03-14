import React, { Component } from 'react';
import { validator } from '../helpers/validators';
import matchInputs from '../helpers/matchInputs'
import classNames from 'classnames'

export default class SmartButton extends Component {

  constructor () {

    super()

    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.submit = this.submit.bind(this)
    this.onClick = this.onClick.bind(this)
    this.validateAllInputs = this.validateAllInputs.bind(this)
  }

  validateAllInputs() {

    let formData = this.props.form.data
    let step = this.props.form.step

    let validatedInputs = Object.keys(formData)
      .filter(property => formData[property].step === step)
      .reduce((acc, current) => ({
        ...acc,
        [current]: {
          ...formData[current],
          error: validator(formData[current].validators.methods, formData[current].value)
        }
      }), {})

    let allpasstest = Object.keys(validatedInputs)
      .every(input => validatedInputs[input].error === false)

    let allinputsMatch = matchInputs(validatedInputs)

    if (!allpasstest || !allinputsMatch) {

      this.props.dispatch({
        type: 'FORM_MULTIPLE_INPUT_CHANGE',
        payload: {
          data: validatedInputs
        }
      })

      return false

    } else {

      return true
    }
  }

  nextStep () {

    this.props.dispatch({
      type: 'FORM_INCREMENT_STEP'
    })
  }

  prevStep () {

    this.props.dispatch({
      type: 'FORM_DECREMENT_STEP'
    })
  }

  submit () {

    console.log('rannnn after')

    // let data = Object.keys(formData).reduce((acc, current) => {

    //   let obj = acc || {}

    //   obj[current] = this.props.form.data[current].value

    //   return obj

    // }, {})

    // if (this.props.form.tokenObj) {

    //   data.token = this.props.form.tokenObj.token
    //   data.property = this.props.form.tokenObj.property
    //   data.heading = this.props.form.tokenObj.heading
    // }

    // this.props.dispatch(this.props.onSubmit(data))
  }

  onClick () {

    if (this.props.disabled === undefined) {

      let test = this.validateAllInputs()

      if (!test) return

    } else if (this.props.disabled === true) {

      return
    }

    return this[this.props.type]()
  }

  render () {

    let ButtonClassNames = classNames(
      [this.props.className],
      {
        [this.props.disabledClassName]: this.props.disabled && !this.props.form.loading
      }
    )

    return <div onClick={this.onClick} className={ButtonClassNames}>
            {this.props.children}
           </div>
  }
}

