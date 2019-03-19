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

  constructor() {

    super()

    this.submit = this.submit.bind(this)
  };

  submit(response) {

    // your response from the server, do whatever you want now!
  };

  render () {

    //props exposed by higher order component
    let formProps = {
      form: this.props.form, //form state
      updateform: this.props.updateform //method for updating form state
    };
    /* disabled is also exposed by HOC and is a bool 
    that you can use to disable the submit button. */
    let disabled = this.props.disabled;

    return (

      /* formProps.form.response will contain a response 
       if you don't pass a success callback to the Button component. */
      <div className='formSubmitSuccess'>{formProps.form.response}</div> 
      //If you get an error from the server that will be here.
      <div className='formSubmitError'>{formProps.form.error}</div>
      //When form is loading you can render some sort of loader.
      {formProps.form.loading && 'Loading...'}
```
<details>
  <summary>Click to view basic Input.</summary>
  <p>
  
```js
    <div className='input-container'>

      <Response 
        {...formProps}
        for={'first_name'} 
        errorClassName='input-response-error' 
      />

      <label className='label'>First Name:</label>

      <Input
        {...formProps}
        name='first_name'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
        validators={[
          {
            method: "notEmpty", 
            error: "First name cannot be empty."
          },
          {
            method: "onlyLetters", 
            error: "First name can only contain letters."
          },
          {
            method: "maxCharaters",
            error: "First name cannot be longer than 35 characters."
          }
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

      /* Query sends JSON post request after user 
      stops typing and input has been validated. */
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
          {
            method: "notEmpty",
            error: "Email name cannot be empty."
          },
          {
            method: "validEmail",
            error: "Please enter a valid email."
          }
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
          {
            method: "notEmpty", 
            error: "Password name cannot be empty."
          },
          {
            method: "validPassword",
            error: "Password must contain at least 8 character and 1 number."
          }
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
          {
            method: "notEmpty",
            error: "Password name cannot be empty."
          },
          {
            method: "validPassword",
            error: "Password must contain at least 8 character and 1 number."
          }
        ]}
        type='password'
      />

    </div>
```
</p>
</details>

<details>
  <summary>Click to view textarea Input.</summary>
  <p>
  
```js
    <div className='input-Container'>

      <Response
        {...formProps}
        for='message'
        errorClassName='input-response-error'
      />

      <label className='label'>Message:</label>

      <Input
        {...formProps}
        name='message'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
        type='textarea'
        scrollUp // after user finished message it will scroll to top of page.
        // You can use any validators here too
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

      <Response 
        {...formProps}
        for='favorite_color'
        errorClassName='input-response-error'
        selectError='Please select a color.'
      />

      <div className='radio-container'>
        <Input 
          {...formProps} 
          required
          name='favorite_color' 
          value='red' 
          type='radio' 
        />
        <label className='label'>Red</label>
      </div>

      <div className='radio-container'>
        <Input 
          {...formProps} 
          name='favorite_color' 
          value='green' 
          type='radio'
        />
        <label className='label'>Green</label>
      </div>

      <div className='radio-container'>
        <Input 
          {...formProps} 
          name='favorite_color' 
          value='blue' 
          type='radio'
        />
        <label className='label'>Blue</label>
      </div>

    </div>
```
</p>
</details>

<details>
  <summary>Click to view select Inputs.</summary>
  <p>
  
```js
   <div className='select-container'>
  
    <Response 
      {...formProps} 
      for='state' 
      errorClassName='input-response-error' 
      selectError='Please select a state.'
    />

    <label className='label'>Select State:</label>

    <Input
      {...formProps}
      required
      name='state'
      type='select'
      className='select-class'
      oddOptionClass='odd-option-class'
      evenOptionClass='even-option-class'
      options={[
        {value: '', text: 'Please select an option'},
        {value: 'MA', text: 'Massachusetts'},
        {value: 'FL', text: 'Florida'},
        {value: 'CA', text: 'California'}
      ]}
      />

  </div>
```
</p>
</details>

```js
    /* 
    Submit sends a json post request to your url 
    with all the data from the form. 

    success={this.submit} is a function you can pass to 
    handle the response from your server
     */
    <Button
      {...formProps}
      disabled={disabled}
      className='button'
      disabledClassName='button-disabled'
      url='http://yourwebsite.com/signup'
      success={this.submit}
      extraData={{
        token: user.token,
        /* more whatever
          If you need to send more data with the request body
          you can put that here.
        */
      }}
      type='submit'
      >
      Submit
    </Button>
    );
  };
};

// Wrap your component with the Higher Order Component
export default SimplerForm(App)
```

Demo page for single-step form: [`https://mellocloud.com/react-simpler-forms/single-step`](https://mellocloud.com/react-simpler-forms/single-step)

### Multi-step forms

```js
import React, { Component } from 'react';
import { SimplerForm, Input, Response, Button } from 'react-simpler-forms';

class Step1 extends Component {
  
  render() {

    let {disabled, ...rest} = this.props.formProps

    return (
      <div>
```

<details>
  <summary>Click to view Inputs.</summary>
  <p>

```js
    <div className='input-container'>

      <Response 
        {...rest} 
        for={'first_name'} 
        errorClassName='input-response-error' 
      />

      <label className='label'>First Name:</label>

      <Input
        {...rest}
        name='first_name'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
        validators={[
          {
            method: "notEmpty",
            error: "First name cannot be empty."
          },
          {
            method: "onlyLetters",
            error: "First name can only contain letters."
          },
          {
            method: "maxCharaters",
            error: "First name cannot be longer than 35 characters."
          }
        ]}
      />

    </div>

    <div className='input-container'>

      <Response 
        {...rest}
        for={'last_name'}
        errorClassName='input-response-error' 
      />

      <label className='label'>Last Name:</label>

      <Input
        {...rest}
        name='last_name'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
        validators={[
          {
            method: "notEmpty",
            error: "Last name cannot be empty."
          },
          {
            method: "onlyLetters",
            error: "Last name can only contain letters."
          },
          {
            method: "maxCharaters", 
            error: "Last name cannot be longer than 35 characters."
          }
        ]}
      />

    </div>
```

</p>
</details>

```js

      <Button
        {...rest}
        disabled={disabled}
        className='button'
        disabledClassName='button-disabled'
        type='nextStep'
        >
        Next
      </Button>
    </div>
    );
  };
};

class Step2 extends Component {
  
  render() {

    let {disabled, ...rest} = this.props.formProps

    return (
      <div>
```

<details>
  <summary>Click to view Input.</summary>
  <p>

```js
    <div className='input-container'>

      <Response 
        {...rest} 
        for='email' 
        errorClassName='input-response-error' 
        successClassName='input-response-success'
      />

      <label className='label'>Email:</label>

      <Input
        {...rest}
        name='email'
        className='input'
        focusedClassName='input-focused'
        errorClassName='input-error'
        query='http://yourwebsite.com/account/checkemail'
        delayError={1400}
        type='email'
        validators={[
          {
            method: "notEmpty", 
            error: "Email name cannot be empty."
          },
          {
            method: "validEmail",
            error: "Please enter a valid email."
          }
        ]}
      />

    </div>
```

</p>
</details>

```js

      <Button
        {...rest}
        disabled={disabled}
        className='button'
        disabledClassName='button-disabled'
        type='nextStep'
      >
        Next
      </Button>

      <Button
        {...rest}
        className='button'
        type='prevStep'
      >
        previous
      </Button>
    </div>
    );
  };
};

class Step3 extends Component {

  constructor() {

    super()

    this.submit = this.submit.bind(this)
  };

  submit(response) {

    // your response from the server, do whatever you want now!
  };
  
  render() {

    let {disabled, ...rest} = this.props.formProps

    return (
      <div>
```

<details>
  <summary>Click to view Inputs.</summary>
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
          {
            method: "notEmpty", 
            error: "Password name cannot be empty."
          },
          {
            method: "validPassword", 
            error: "Password must contain at least 8 character and 1 number."
          }
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
          {
            method: "notEmpty", 
            error: "Password name cannot be empty."
          },
          {
            method: "validPassword", 
            error: "Password must contain at least 8 character and 1 number."
          }
        ]}
        type='password'
      />

    </div>
```

</p>
</details>

```js

      <Button
        {...rest}
        disabled={disabled}
        className='button'
        disabledClassName='button-disabled'
        url='http://yourwebsite.com/signup'
        success={this.submit}
        type='submit'
        >
        Submit
      </Button>

      <Button
        {...rest}
        className='button'
        type='prevStep'
      >
        previous
      </Button>
    </div>
    );
  };
};

class App extends Component {

  render () {

    let formProps = {
      form: this.props.form,
      updateform: this.props.updateform,
      disabled: this.props.disabled
    };

    let steps = [
      <Step1 formProps={formProps} />,
      <Step2 formProps={formProps} />,
      <Step3 formProps={formProps} />
    ];

    return (

      {steps[formProps.form.step]}
    );
  };
};

export default SimplerForm(App)
```

Demo page for multi-step form: [`https://mellocloud.com/react-simpler-forms/multi-step`](https://mellocloud.com/react-simpler-forms/multi-step)

