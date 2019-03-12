export function loader() {

  return {
    type: "FORM_LOADING"
  }
}

function querySuccess(query) {

  return {
    type: "FORM_QUERY_RESPONSE",
    payload: {
      property: query.property,
      response: query.success,
      error: false,
      queryVerified: true
    }
  }
}

function queryError(query) {

  return {
    type: "FORM_QUERY_RESPONSE",
    payload: {
      property: query.property,
      response: query.error,
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
      property: 'email'
    },
    loader: loader,
    error: queryError,
    success: querySuccess
  }
}