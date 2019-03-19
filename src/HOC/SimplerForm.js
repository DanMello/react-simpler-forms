import React, { Component } from 'react';
import { validator, isEmpty, allmatch, isJson } from '../helpers/validators'
import FormAPI from '../helpers/api'

let ManageForm = function (WrappedComponent) {

  return class extends Component {

    constructor() {
      super()

      this.state = {
        step: 0,
        data: {},
        loading: false,
        error: false,
        response: null
      }

      this.updateForm = this.updateForm.bind(this)
      this.updateData = this.updateData.bind(this)
      this.updateMultiple = this.updateMultiple.bind(this)
      this.incrementStep = this.incrementStep.bind(this)
      this.decrementStep = this.decrementStep.bind(this)
      this.queryData = this.queryData.bind(this)
      this.querySuccess = this.querySuccess.bind(this)
      this.queryError = this.queryError.bind(this)
      this.resetFormResponses = this.resetFormResponses.bind(this)
      this.submitForm = this.submitForm.bind(this)
      this.submitError = this.submitError.bind(this)
      this.submitSuccess = this.submitSuccess.bind(this)
      this.toggleLoading = this.toggleLoading.bind(this)
      this.resetFields = this.resetFields.bind(this)
      this.resetForm = this.resetForm.bind(this)
    }

    updateData(payload) {

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [payload.property] : {
            ...prevState.data[payload.property],
            ...payload
          }
        }
      }))
    }

    updateMultiple(payload) {

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          ...payload
        } 
      }))
    }

    queryData(payload) {

      let queryPayload = {
        ...payload,
        success: 'querySuccess',
        error: 'queryError'
      }

      FormAPI(this.updateForm, queryPayload)
    }

    querySuccess(response) {

      let message = response.data

      if (typeof message !== 'string' || isJson(message)) {

        message = 'Something went wrong searching your input.'
      }

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [response.property] : {
            ...prevState.data[response.property],
            queryResponse: message,
            error: false,
            queryVerified: true
          }
        }
      }))
    }

    queryError(response) {

      let message = response.data

      if (typeof message !== 'string' || isJson(message)) {

        message = 'Something went wrong searching your input.'
      }

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [response.property] : {
            ...prevState.data[response.property],
            queryResponse: message,
            error: true,
            queryVerified: false
          }
        }
      }))
    }

    incrementStep() {

      this.setState(prevState => ({
        step: prevState.step + 1
      }))
    }

    decrementStep() {

      this.setState(prevState => ({
        step: prevState.step - 1
      }))
    }

    resetFormResponses() {

      this.setState({
        response: null,
        error: false
      })
    }

    submitSuccess(response) {

      let message = response

      if (typeof message !== 'string' || isJson(message)) {

        message = 'Your data was submitted successfully.'
      }

      this.setState({
        response: message,
        error: false
      })
    }

    submitError(response) {

      let message = response

      if (typeof message !== 'string' || isJson(message)) {

        message = 'Something went submitting your data.'
      }

      this.setState({
        response: null,
        error: message
      })
    }

    submitForm(payload) {

      FormAPI(this.updateForm, payload)
    }

    toggleLoading() {
      
      this.setState(prevState => ({
        loading: !prevState.loading
      }))
    }

    resetFields(payload) {

      let data = Object.keys(this.state.data)
        .filter(x => !!payload.includes(x))
        .reduce((acc, current) => ({
          ...acc,
          [current]: {
            ...this.state.data[current],
            error: null,
            value: ''
          }
        }), {})

      this.setState(prevState => ({
        data: {
          ...prevState.data,
          ...data
        }
      }))
    }

    resetForm() {

      this.setState({
        step: 0,
        data: {},
        loading: false,
        error: false,
        response: null
      })
    }

    updateForm(method, payload) {

      return this[method](payload)
    }

    render() {

      return <WrappedComponent {...this.props} form={this.state} updateform={this.updateForm}/>
    }
  }
}

let FilterData = function (WrappedComponent) {

  return class extends Component {

    render() {

      let formData = this.props.form.data
      let data = {}

      if (!isEmpty(formData)) {

        let step = this.props.form.step
          
        data = Object.keys(formData)
          .filter(property => formData[property].step === step)
          .reduce((acc, property) => ({...acc, [property]: formData[property] }), {})
      }

      return <WrappedComponent {...this.props} data={data} />
    }
  }
}

let ValidateInputs = function (WrappedComponent) {

  return class extends Component {

    render() {

      let data = this.props.data
      let allValid = true

      if (!isEmpty(data)) {

        allValid = Object.keys(data)
          .filter(property => !!data[property].validators)
          .every(input => !data[input].error && data[input].error !== null)
      }

      return (
        <WrappedComponent {...this.props} allValid={allValid} />
      )
    }
  }
}

let ValidateQuerys = function (WrappedComponent) {

  return class extends Component {

    render() {

      let data = this.props.data
      let allQueried = true

      if (!isEmpty(data)) {

        allQueried = Object.keys(data)
          .filter(property => data[property].query)
          .every(property => data[property].queryVerified === true)
      }

      return (
        <WrappedComponent {...this.props} allQueried={allQueried} />
      )
    }
  }
}

let MatchInputs = function (WrappedComponent) {

  return class extends Component {

    render() {

      let { data, ...rest } = this.props
      let allMatch = true
      let matchErrorArray = []

      if (!isEmpty(data)) {

        allMatch = allmatch(data)
      }

      return (
        <WrappedComponent {...rest} allMatch={allMatch} />
      )
    }
  }
}

let EnableButton = function (WrappedComponent) {

  return class extends Component {

    render() {

      let { allValid, allQueried, allMatch, ...rest} = this.props

      let conditionArray = [
        allValid,
        allQueried,
        allMatch
      ]

      let condition = conditionArray.every(item => item === true)

      return (
        <WrappedComponent {...rest} disabled={!condition} />
      )
    }
  }
}

export default function SimplerForm (component) {

  return ManageForm(FilterData(ValidateInputs(ValidateQuerys(MatchInputs(EnableButton(component))))))
}