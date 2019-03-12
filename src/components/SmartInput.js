import React, { Component } from 'react';
import { validator } from '../helpers/validators';
import { query } from '../actions/ReduxSmartFormsActions'

export default class SmartInput extends Component {

  constructor () {

    super()

    this.state = {
      queryDelay: null,
      typingDelay: null
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {

    let data = {
      value: '',
      step: this.props.form.step,
      error: null
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

    let data = {
      value: e.target.value,
      error: validator(this.props.validation.methods, e.target.value)
    }

    if (this.props.query && !data.error) {

      data.queryVerified = false
      data.queryResponse = null

      this.setState({
        queryDelay: setTimeout(() => {

          let value = this.props.form.data[this.props.name].value

          this.props.dispatch(query(this.props.name, value, this.props.query.url))

        }, this.props.query.delayAfterValidated)
      })
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

    this.props.dispatch({
      type: 'FORM_INPUT_CHANGE',
      payload: {
        property: this.props.name,
        data
      }
    })
  }

  render () {

    let input = this.props.form.data[this.props.name]
    let value = ''

    if (input) {

      value = input.value
    }

    return <input onChange={this.onChange} value={value} />
  }
}

