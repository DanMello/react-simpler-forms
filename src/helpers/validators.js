function validator (validators, input) {

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

function allmatch (data) {

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
  allmatch,
  isEmpty,
  validator,
  isJson
}