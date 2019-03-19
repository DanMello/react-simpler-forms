# react-simpler-forms
React Higher Order component that manages all of your forms state along with other components that make it easy to create, validate, perform search queries, and submit single or multi-step forms.

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
    <div className='input-container'>

      <Response {...formProps} for={'first_name'} errorClassName='input-response-error' />

      <label className='label'>First Name:</label>

      <Input
        {...formProps}
        name='first_name'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
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
    <div className='input-container'>

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

<details>
  <summary>Click to view Inputs that are required to match.</summary>
  <p>
  
```js
    <div className='input-container'>

      <Response
        {...formProps}
        for='Password'
        errorClassName='input-response-error'
        matchError={{
          matchName: 'password',
          error: 'Password do not match.'
        }}
      />

      <label className='label'>Password:</label>

      <Input
        {...formProps}
        name='Password'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
        delayError={1400}
        match='password'
        validators={[
          {method: "notEmpty", error: "Password name cannot be empty."},
          {method: "validPassword", error: "Password must contain at least 8 character and 1 number."}
        ]}
        type='password'
      />

    </div>

    <div className='input-container'>

      <Response 
        {...formProps}
        for='PasswordRepeat'
        errorClassName='input-response-error'
      />

      <label className='label'>Password Repeat:</label>

      <Input
        {...formProps}
        name='PasswordRepeat'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
        delayError={1400}
        match='password'
        validators={[
          {method: "notEmpty", error: "Password name cannot be empty."},
          {method: "validPassword", error: "Password must contain at least 8 character and 1 number."}
        ]}
        type='password'
      />

    </div>
```
</p>
</details>

<details>
  <summary>Click to view radio button Inputs.</summary>
  <p>
  
```js
    <div className='input-radio-container'>

      <h1>Favorite color</h1>

      <Response {...formProps} for={'favorite_color'} errorClassName={'input-response-error'} selectError='Please select a color.'/>

      <div className='radio-container'>
        <Input {...formProps} name={'favorite_color'} value='red' type='radio' required/>
        <label className='label'>Red</label>
      </div>

      <div className='radio-container'>
        <Input {...formProps} name={'favorite_color'} value='green' type='radio'/>
        <label className='label'>Green</label>
      </div>

      <div className='radio-container'>
        <Input {...formProps} name={'favorite_color'} value='blue' type='radio'/>
        <label className='label'>Blue</label>
      </div>

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