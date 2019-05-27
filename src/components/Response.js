import React, { Component } from 'react';

export default class Response extends Component {

  componentDidMount() {
    
    if (typeof this.props.for !== 'string') {

      console.error(
        "Response prop 'for' is required and must be a string.\n",
        "Example: for='first_name'"
      );
    }
  }

  render () {

    let { errorClassName, successClassName, matchError, selectError, ...rest } = this.props
    let input = this.props.form.data[this.props.for]
    let error, queryResponse, typing, queryVerified;

    if (input) {

      typing = input.typing
      error = input.error
      queryResponse = input.queryResponse
      queryVerified = input.queryVerified
    }

    if (error === false && matchError) {

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
        .map(a => matchingGroups[a].every(b => (matchingGroups[a][0].value === b.value)))
        .every(item => !!item)

      let errorOnMatchingInputs = Object.keys(matchingGroups)
        .map(item => matchingGroups[item].every(b => b.error === false))
        .every(item => !item)

      typing = Object.keys(matchingGroups)
        .map(item => matchingGroups[item].every(b => b.typing === false))
        .every(item => !item)

      if (!allMatch && !errorOnMatchingInputs) {

        error = matchError.error
        typing = false
      }
    }

    if (error === true && selectError) {

      error = selectError
    }

    return <div className={(error || !queryVerified) ? errorClassName : successClassName}>{!typing ? queryResponse || error : null}</div>
  }
}