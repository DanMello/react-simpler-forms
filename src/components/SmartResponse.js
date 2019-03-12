import React, { Component } from 'react';

export default class SmartResponse extends Component {

  render () {

    let { validationError, emptyError, maxCharatersError, errorClassName, successClassName, matchError, ...rest } = this.props
    let input = this.props.form.data[this.props.for]
    let errors = {
      validationError: validationError,
      emptyError: emptyError,
      maxCharatersError: maxCharatersError,
      matchError: null
    }
    let error, queryResponse, typing

    if (input) {

      typing = input.typing
      error = input.error
      queryResponse = input.queryResponse
    }

    if (!error && matchError) {

      let data = this.props.form.data

      let matchingGroups = Object.keys(data)
        .filter(input => data[input].match === matchError.matchName)
        .reduce((result, item) => ({
          ...result,
          [data[item].match]: [
            ...(result[data[item].match] || []),
            data[item]
          ]
        }), {})

      let allMatch = Object.keys(matchingGroups)
        .map(a => matchingGroups[a].every(b => matchingGroups[a][0].value === b.value))
        .every(item => !!item)

      typing = Object.keys(matchingGroups)
        .map(item => matchingGroups[item].every(b => b.typing === false))
        .every(item => !item)

      if (!allMatch) {

        errors.matchError = matchError.error
        error = 'matchError'
      }
    }

    return <div className={error ? errorClassName : successClassName}>{!typing && errors[error] || queryResponse}</div>
  }
}

// export class SmartResponse extends Component {

//   render() {

//     let { validationError, emptyError, input, successClassName, className, matchError, maxCharatersError, ...rest } = this.props

//     let error, typing, success, queryError, errorMessage

//     if (input) {

//       error        =  input.error
//       typing       =  input.typing
//       success      =  input.successMessage
//       queryError   =  input.queryError
//       errorMessage =  input.errorMessage
//     }

//     let errors = {
//       validationError: validationError,
//       emptyError: emptyError,
//       maxCharatersError: maxCharatersError
//     }

//     let formInputs = classNames(
//       [className],
//       {
//         [successClassName]: success
//       }
//     )

//     return (<div className={formInputs} {...rest}>{!typing && errors[error] || queryError || success || matchError || errorMessage}</div>)
//   }
// }