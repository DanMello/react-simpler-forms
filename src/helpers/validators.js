export function validator (validators, input) {

  let error = ''

  let methods = {
    notEmpty: function (input, errormessage) {

      error = errormessage

      return input !== ''
    },
    onlyLetters: function (input, errormessage) {

      error = errormessage

      return /^[a-zA-Z\s]*$/.test(input)
    },
    maxCharaters: function (input, errormessage) {

      error = errormessage

      return /^[a-zA-Z\s]{0,35}$/.test(input)
    },
    validEmail: function (input, errormessage) {

      error = errormessage

      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input)
    },
    validPassword: function (input, errormessage) {

      error = errormessage

      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input)
    },
  }

  let errorType = validators.map(x => {

    if (typeof x.method === 'function') {

      return x.method(input, x.error) ? false : x.error
      
    } else {

      return methods[x.method](input, x.error) ? false : error 
    }

  }).find(x => x !== false)

  return errorType ? errorType : false
}