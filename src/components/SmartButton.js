import React, { Component } from 'react';

export default class SmartButton extends Component {

  constructor () {

    super()

    this.state = {
      value: ''
    }

    // this.onChange = this.onChange.bind(this)
  }

  render () {

    return <button disabled={this.props.disabled}>
            {this.props.children}
           </button>
  }
}

