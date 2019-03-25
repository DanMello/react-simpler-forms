# react-simpler-forms

[![npm version](https://badge.fury.io/js/react-simpler-forms.svg)](//npmjs.com/package/react-simpler-forms)

React Higher Order component that manages all of your forms state along with other components that make it easy to create, validate, perform search queries, and submit single or multi-step forms.

* Zero dependencies.

* 99.9% declarative.

### Requirements
1. React and React-dom 16.5.2 or greater.

2. Babel 7

### Installation

```bash
npm install react-simpler-forms --save
```

### Single-step form

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
    /* disabled is also exposed by HOC and is a boolean
    that you can use to disable the submit button. */
    let disabled = this.props.disabled;

    return (

      /* formProps.form.response will contain the success response from the server
       if you don't pass a success callback to the Button component. Also if you 
       don't pass a success callback the form inputs will reset upon success.
       */
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
        for='first_name'
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

<details>
  <summary>Click to view checkbox Input.</summary>
  <p>
  
```js
    <div>

      <Response  
        {...formProps} 
        for='terms'
        errorClassName='input-response-error' 
        selectError='You must agree to terms'
      />

      <div>
        
        <Input 
          {...formProps} 
          name='terms' 
          value='Agreed'
          type='checkbox' 
          required
          />

        <label className='label'>By checking this box you agree to the terms.</label>

      </div>

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

// Wrap your component with the Higher Order Component.
export default SimplerForm(App)
```

### Multi-step form

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

Demo page : [`https://mellocloud.com/react-simpler-forms`](https://mellocloud.com/react-simpler-forms)

# Components

### SimplerForm
This is the higher order component that is used to manage all of your forms state and manage whether button is disabled or not. Simply wrap around a component where you want to create a new form.

The higher order component passes down three props

1. this.props.form
2. this.props.updateform
3. this.props.disabled

All components require this.props.form and this.props.updateform. If you want to disable the button until validation then you can pass disabled={this.props.disabled} to the Button component.

Make sure you pass the form and updateform props using the same name

```js
form={this.props.form}
formupdate={this.props.updateform}
```
Note: You do not need to wrap your form with the standard form tag, the SimplerForm HOC handles all post requests.

### Input
This the component that is used to create all your inputs including text, email, password, textarea, select, radio, and checkbox

Prop | Description | type
---- | ----------- | -------      
`form` | required this.props.form | obj
`formupdate` | required this.props.formupdate | function 
`name` | The input name | string
`className` | This is the default className for the input | string
`focusedClassName` | When input is focused this classname will be applied to the input along with className | string
`errorClassName` | When there is an error with the input, this classname will be applied to the input along with className | string
`validators` | This is an array of objects that contain methods to validate the input along with an error. By default react-simpler-forms comes with the following validators 'notEmpty', 'onlyLetters', 'maxCharacters' (35 characters), 'validEmail', 'validPassword' (At least 8 characters and 1 number). You can pass custom validators as well, by putting a function in the method property, more info below under custom validators. | array
`delayError` | You can add a typing delay before showing the error. For example if someone is typing their email and you don't want to show an error right when they type that the email is invalid then you can pass a number to the delayError prop. The number is a delay in milliseconds.  | number
`query` | If you want to perform a search query when the user is typing, you can pass a url and this will send a POST request with the input to your url. The post request is only made after the input is validated using the validators. | string
`match` | This is used when you need two or more inputs to match, put this prop with the same value on all the inputs that need to match | string
`type` | This is used to specify the type of input, you can pass text, email, password, textarea, radio, select or checkbox. | string
`required` | This only applies to the select, radio and checkbox input. For radio buttons just put required on the first radio button input and it will work because you can only select one input. For checkbox you have to apply required to each input you want to be required and the error gets grouped based on the checkbox name, meaning you can only display one error per category which is based on the name you pass to the input. | boolean
`options` | This only applies to the select input and its an array of options | array
`oddOptionClass` | odd classname for option selections | string
`evenOptionClass` | even classname for option selections | string
`value` | For radio and checkbox you need to pass a value prop with the input value | string
`scrollUp` | For textarea only, if you need to scroll up when you're done typing. I use this in my contact form on my website because the submit button is on top of the textarea and it scrolls down a lot if you type a long message. | boolean

Aside from that you can pass other props that are normally used with inputs like autoComplete='off' or whatever.

### Response
This the component that is used to display a response whether an error or success from your input. 

Prop | Description | type
---- | ----------- | -------
`form` | required this.props.form | obj
`formupdate` | required this.props.formupdate | function 
`for` | name of the input this is being applied to | string
`errorClassName` | classname if response is an error | string
`successClassName` | classname if response is a success, this is only used for queries | string
`matchError` | this is a response for inputs that required match. This is an obj that contains two properties matchName and error. matchName is the name you gave to all the inputs that need to match and error is the error if they don't | obj
`selectError` | This is used to display the error from select, radio, or checkbox | string

### Button
This the component that is used to submit your form or go to the next or previous step of a multi-step form 

Prop | Description | type
---- | ----------- | -------
`form` | required this.props.form | obj
`formupdate` | required this.props.formupdate | function
`disabled` | This is not required but you can pass this.props.disabled which gets passed from the HOC and it will disable the button until all the inputs are validated. | boolean
`className` | This is the default classname for the Button | string
`disabledClassName` | classname applied to Button when disabled is true | string
`url` | if the button type is submit you can pass a url and when you submit your data will be sent using JSON post request | string
`extraData` | If you need to add extra data like a token to the request body you can put that here | obj
`type` | valid types are submit, nextStep, or prevStep | string

# More info

### Custom Validators
If you want to pass custom validators you can do so like this.

```js

nameisdan(value) {
  
  return value === 'dan'
};

<Input
  validators={[
    {method: this.nameisdan, error: 'Name is not equal to dan'}
  ]}
/>

```

# What I learned / Want to learn / Improved on

1. I became a lot more comfortable with higher order functions like reduce, map, filter, and every. Not mutating objects and arrays is probably one of the most important things I've ever learned.

2. As the logic got more complicated I realized it became too much to keep in my head which is why I'm starting to learn unit testing and TDD, I wish it was implemented in this project but maybe once I learn more about unit testing I'll implement it here but definitely in future projects.

3. Half way through the project I realized I didn't need any of the dependencies I was using, they made my bundle size huge and I was barely utilizing them. So I removed all my dependencies and wrote some of my own code to do the same thing. For example I was using redux to manage the state of the forms before cause I though it was convenient but all I had to do was create a state in the HOC and some methods to update it, then pass down a function that returns a function which can run any of the other functions by passing the name and some data to update the state. This reduced my bundle size by half. I repeated the process with other dependencies. For prop-types all I did there was check some props then console.error if something is wrong. For axios I just made my own xhr function that can be reused for all my post requests.

Thank you for checking out my project.
