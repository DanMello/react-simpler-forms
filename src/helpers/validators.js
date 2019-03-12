export function validator (validators, input) {

  let error = ''

  let methods = {
    notEmpty: function (input) {

      error = 'emptyError'

      return input !== ''
    },
    onlyLetters: function (input) {

      error = 'validationError'

      return /^[a-zA-Z\s]*$/.test(input)
    },
    maxCharaters: function (input) {

      error = 'maxCharatersError'

      return /^[a-zA-Z\s]{0,35}$/.test(input)
    },
    validEmail: function (input) {

      error = 'validationError'

      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input)
    },
    validPassword: function (input) {

      error = 'validationError'

      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input)
    },
  }

  let errorType = validators.map(x => methods[x](input) ? false : error).find(x => x !== false)

  return errorType ? errorType : false
}