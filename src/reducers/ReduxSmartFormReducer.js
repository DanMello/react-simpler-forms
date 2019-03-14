export default function reducer(state={
  step: 0,
  data: {},
  loading: false,
  error: false,
  response: null,
  tokenObj: {}
}, action) {

  switch (action.type) {
    case 'FORM_INPUT_CHANGE': {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.property] : {
            ...state.data[action.payload.property],
            ...action.payload.data
          }
        }
      }
    }
    case 'FORM_MULTIPLE_INPUT_CHANGE': {

      let newData = action.payload.data

      return {
        ...state,
        data: Object.keys(newData).reduce((diff, key) => {
          if (state.data[key] === newData[key]) return diff
          return {
            ...diff,
            [key]: newData[key]
          }
        }, {})
      }
    }
    case 'FORM_RESET_FIELDS': {  
      return {
        ...state, 
        data: Object.keys(state.data)
          .filter(x => !action.payload.includes(x))
          .reduce((acc, current) => ({...acc, [current]: state.data[current] }), {})
      }
    }
    case 'FORM_RESET': {
      return { step: 0, data: {}, loading: false, error: false, typingDelays: {}, queryInputs: {}, response: null, tokenObj: {}}
    }
    case 'FORM_SUBMIT_ERROR': {
      return {...state, error: action.payload, loading: false}
    }
    case 'FORM_QUERY_RESPONSE': {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.property] : {
            ...state.data[action.payload.property],
            error: action.payload.error,
            queryResponse: action.payload.response,
            queryVerified: action.payload.queryVerified
          }
        }
      }
    }
    case 'FORM_MESSAGE_SENT': {
      return {
        ...state,
        loading: false,
        response: action.payload,
        data: {}
      }
    }
    case 'FORM_ADD_TOKEN': {
      return {
        ...state,
        tokenObj: action.payload
      }
    }
    case 'FORM_PROPERTY_ERROR': {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.property] : {
            ...state.data[action.payload.property],
            errorMessage: action.payload.error
          }
        },
        loading: false
      }
    }
    case 'FORM_INCREMENT_STEP': {
      return {...state, step: state.step + 1}
    }
    case 'FORM_DECREMENT_STEP': {
      return {...state, step: state.step - 1}
    }
    case 'FORM_LOADING': {
      return {...state, loading: true}
    }
    case 'FORM_SET_STEP': {
      return {...state, step: action.payload}
    }
    default :
      return state
  }
}