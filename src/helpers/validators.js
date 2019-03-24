function validator (validators, input) {

  let error = ''

  let methods = {
    notEmpty: function (input, errormessage) {

      error = errormessage

      return input !== null && input !== ''
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

function allInputsMatch (data) {

  let matchingGroups = Object.keys(data)
    .filter(input => data[input].match)
    .reduce((result, item) => ({
      ...result,
      [data[item].match]: [
        ...(result[data[item].match] || []),
        data[item]
      ]
    }), {})

  return Object.keys(matchingGroups)
    .map(a => matchingGroups[a].every(b => matchingGroups[a][0].value === b.value))
    .every(item => !!item)
}

function allSelectionsValidated(data, checkboxonly) {
  
  let allRequired = Object.keys(data)
    .filter(property => data[property].required)
    .every(input => !!data[input].value)

  let allCheckBoxes = Object.keys(data)
    .filter(property => data[property].values)
    .reduce((acc, current) => ({
      ...acc,
      [current] : {
        ...data[current].values
      }
    }), {})

  let allRequiredCheckboxes = Object.keys(allCheckBoxes).every(property => {

    return Object.keys(data[property].values).filter(item => {

      return data[property].values[item].required

    }).every(item => {

      return data[property].values[item].checked === true
    })
  })

  let array = checkboxonly ? [allRequiredCheckboxes] : [allRequired, allRequiredCheckboxes]

  return array.every(item => item === true)
}

function allInputsQueried(data) {

  return Object.keys(data)
        .filter(property => data[property].query)
        .every(property => data[property].queryVerified === true)
}

function allInputsErrorFalse(data) {

  return Object.keys(data).every(input => data[input].error === false)
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function isJson(item) {

    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

export {
  validator,
  isEmpty,
  isJson,
  allInputsMatch,
  allSelectionsValidated,
  allInputsQueried,
  allInputsErrorFalse
}