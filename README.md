# react-simpler-forms
React Higher Order component that manages all of your forms state along with other components that make it easy to create, validate, query, and submit single or multi-step forms.

* Zero dependencies.

* 100% declarative.

### Requirements
1. React and React-dom 16.5.2 or greater.

### Usage

```bash
npm install react-simpler-forms --save
```

```js
import React, { Component } from 'react';
import { SimplerForm, Input, Response, Button } from 'react-simpler-forms';

class App extends Component {
  render () {

    //props exposed by higher order component
    let formProps = {
      form: this.props.form, //form state
      updateform: this.props.updateform //method for updating form state
    };
    // disabled is also exposed by HOC and is a bool that you can use to disable the submit button.
    let disabled = this.props.disabled;

    return (
      <div>
         <div className='App-Input-Container'>

          <Response
            {...formProps}
            for={'first_name'}
            errorClassName={'App-Error'}
          />

          <label className='App-Label'>First Name:</label>

          <Input
            {...formProps}
            name={'first_name'}
            className={'App-input'}
            focusedClassName={'App-input-focused'}
            errorClassName={'App-input-error'}
            autoComplete={"off"}
            validators={[
              {method: "notEmpty", error: "First name cannot be empty."},
              {method: "onlyLetters", error: "First name can only contain letters."},
              {method: "maxCharaters", error: "First name cannot be longer than 35 characters."}
            ]}
          />

          <Button
            {...formProps}
            disabled={disabled}
            className={'App-button'}
            disabledClassName={'App-button-disabled'}
            url='http://yourwebsite.com/signup'
            success={this.submit}
            type={'submit'}
            >
            Submit
          </Button>

        </div>
      </div>
    ) 
  };
};

export default SimplerForm(App)
```