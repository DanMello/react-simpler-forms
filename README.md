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
```
  <details>
   <summary>Single Step Form</summary>
   <p>Content 1 Content 1 Content 1 Content 1 Content 1</p>
  </details>

```js
  };
};

export default SimplerForm(App)
```