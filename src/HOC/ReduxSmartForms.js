import React, { Component } from 'react';
import { compose } from 'redux'
import { validator } from '../helpers/validators'
import matchInputs from '../helpers/matchInputs'
import _ from 'lodash'

const FilterData = function (WrappedComponent) {

  return class extends Component {

    render() {

      let form = this.props.state.ReduxSmartFormReducer || this.props.form
      let formData = form.data
      let data = {}

      if (!_.isEmpty(formData)) {

        let step = form.step
          
        data = Object.keys(formData)
          .filter(property => formData[property].step === step)
          .reduce((acc, property) => ({...acc, [property]: formData[property] }), {})
      }

      return <WrappedComponent {...this.props} data={data} />
    }
  }
}

const ValidateInputs = function (WrappedComponent) {

  return class extends Component {

    render() {

      let data = this.props.data
      let allValid = true

      if (!_.isEmpty(data)) {

        allValid = Object.keys(data).every(input => data[input].error === false)
      }

      return (
        <WrappedComponent {...this.props} allValid={allValid} />
      )
    }
  }
}

const ValidateQuerys = function (WrappedComponent) {

  return class extends Component {

    render() {

      let data = this.props.data
      let allQueried = true

      if (!_.isEmpty(data)) {

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

const MatchInputs = function (WrappedComponent) {

  return class extends Component {

    render() {

      let data = this.props.data
      let allMatch = true
      let matchErrorArray = []

      if (!_.isEmpty(data)) {

        allMatch = matchInputs(data)
      }

      return (
        <WrappedComponent {...this.props} allMatch={allMatch} />
      )
    }
  }
}

const EnableButton = function (WrappedComponent) {

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

export default compose(FilterData, ValidateInputs, ValidateQuerys, MatchInputs, EnableButton)