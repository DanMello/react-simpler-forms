import React, { Component } from 'react';
import { validator } from '../helpers/validators';
import matchInputs from '../helpers/matchInputs'
import { submitForm } from '../actions/ReduxSmartFormsActions'
import classNames from 'classnames'
import ReduxSmartForms from '../HOC/ReduxSmartForms' 

class SmartButton extends Component {

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
      .filter(property => !!formData[property].validators)
      .reduce((acc, current) => ({
        ...acc,
        [current]: {
          ...formData[current],
          error: !formData[current].error ? validator(formData[current].validators, formData[current].value) : formData[current].error
        }
      }), {})

    let allpasstest = Object.keys(validatedInputs)
      .every(input => validatedInputs[input].error === false)

    let allInputsQueried = Object.keys(validatedInputs)
          .filter(property => validatedInputs[property].query)
          .every(property => validatedInputs[property].queryVerified === true)

    let allinputsMatch = matchInputs(validatedInputs)

    if (!allpasstest || !allinputsMatch || !allInputsQueried) {

      this.props.dispatch({
        type: 'REDUX_SMART_FORM_MULTIPLE_INPUT_CHANGE',
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
      type: 'REDUX_SMART_FORM_INCREMENT_STEP'
    })
  }

  prevStep () {

    this.props.dispatch({
      type: 'REDUX_SMART_FORM_DECREMENT_STEP'
    })
  }

  submit () {

    let formData = this.props.form.data

    let data = Object.keys(formData)
      .filter(property => formData[property].value !== '')
      .reduce((acc, current) => ({...acc, [current] : formData[current].value }), {})

    if (this.props.extraData) {

      this.props.extraData.forEach(item => {

        data[item.property] = item.value
      })
    }

    this.props.dispatch(submitForm(data, this.props.url, this.props.callBackIsFunction, this.props.callBack))
  }

  onClick () {

    this.props.dispatch({
      type: 'REDUX_SMART_FORM_RESET_RESPONSES'
    })

    if (this.props.form.loading) return 

    if (this.props.type !== 'prevStep') {

      if (this.props.disabled === undefined) {

        let test = this.validateAllInputs()

        if (!test) return

      } else if (this.props.disabledButton === true) {

        return
      }
    }

    return this[this.props.type]()
  }

  render () {

    let buttonDisabled

    if (this.props.disabled) {

      buttonDisabled = this.props.disabledButton
    }

    let ButtonClassNames = classNames(
      [this.props.className],
      {
        [this.props.disabledClassName]: buttonDisabled
      }
    )

    return <div onClick={this.onClick} className={ButtonClassNames}>
            {this.props.children}
           </div>
  }
}

export default ReduxSmartForms(SmartButton)