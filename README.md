# react-simpler-forms
React Higher Order component that manages all of your forms state along with other components that make it easy to create, validate, search query, and submit single or multi-step forms.

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
```
<details>
  <summary>Click to view basic Input.</summary>
  <p>
  
```js
    <div className='input-Container'>

      <Response {...formProps} for={'first_name'} errorClassName={'input-response-error'} />

      <label className='label'>First Name:</label>

      <Input
        {...formProps}
        name={'first_name'}
        className={'input'}
        focusedClassName={'input-focused'}
        errorClassName={'input-error'}
        validators={[
          {method: "notEmpty", error: "First name cannot be empty."},
          {method: "onlyLetters", error: "First name can only contain letters."},
          {method: "maxCharaters", error: "First name cannot be longer than 35 characters."}
        ]}
      />

    </div>
```
</p>
</details>

<details>
  <summary>Click to view Input that executes search query while typing.</summary>
  <p>
  
```js
    <div className='Input-Container'>

      <Response 
        {...formProps} 
        for='email' 
        errorClassName='input-response-error' 
        successClassName='input-response-success'
      />

      <label className='label'>Email:</label>

      // Query sends JSON post request after user stops typing and input has been validated.
      <Input
        {...formProps}
        name='email'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
        query='http://yourwebsite.com/account/checkemail'
        delayError={1400}
        type='email'
        validators={[
          {method: "notEmpty", error: "Email name cannot be empty."},
          {method: "validEmail", error: "Please enter a valid email."}
        ]}
      />

    </div>
```
</p>
</details>

```js
    )
  };
};

export default SimplerForm(App)
```