export function loader() {

  return {
    type: "FORM_LOADING"
  }
}

export function stopLoader() {

  return {
    type: "FORM_STOP_LOADING"
  }
}

function querySuccess(query) {

  let message

  if (typeof query.success !== 'string') {

    message = 'Something went wrong searching your input.'

  } else {

    message = query.success
  }

  return {
    type: "FORM_QUERY_RESPONSE",
    payload: {
      property: query.property,
      response: message,
      error: false,
      queryVerified: true
    }
  }
}

function queryError(query) {

  let message

  if (typeof query.error !== 'string') {

    message = 'Something went wrong searching your input.'

  } else {

    message = query.error
  }

  return {
    type: "FORM_QUERY_RESPONSE",
    payload: {
      property: query.property,
      response: message,
      error: true,
      queryVerified: false
    }
  }
}

export function query(input, value, url) {

  return {
    type: "FETCH",
    payload: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        [input]: value
      },
      url: url
    },
    meta: {
      cancelable: true,
      property: input
    },
    stopLoader: stopLoader,
    loader: loader,
    error: queryError,
    success: querySuccess
  }
}

export function formError(error) {

  let message

  if (typeof response !== 'string') {

    message = 'Oops something went wrong submitting your form.'

  } else {

    message = response
  }

  return {
    type: "FORM_SUBMIT_RESPONSE",
    payload: {
      error: message
    }
  }
}

export function formSuccess(response) {

  let message

  if (typeof response !== 'string') {

    message = 'Success submitting your form.'

  } else {

    message = response
  }

  return {
    type: "FORM_SUBMIT_RESPONSE",
    payload: {
      response: message,
      data: {},
      step: 0,
      error: false
    }
  }
}

export function submitForm(data, url, callbackIsFunction, callback) {

  return {
    type: "FETCH",
    payload: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data,
      url
    },
    stopLoader: stopLoader,
    loader: loader,
    error: formError,
    callbackIsFunction: callbackIsFunction,
    success: callback ? callback : formSuccess
  }
}