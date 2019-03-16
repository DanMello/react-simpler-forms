export default function reducer(state={
  step: 0,
  data: {},
  loading: false,
  error: false,
  response: null
}, action) {

  switch (action.type) {
    case 'REDUX_SMART_FORM_LOADING': {
      return {...state, loading: true}
    }
    case 'REDUX_SMART_FORM_INPUT_CHANGE': {
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
    case 'REDUX_SMART_FORM_MULTIPLE_INPUT_CHANGE': {

      let newData = Object.keys(action.payload.data).reduce((diff, key) => {
        if (state.data[key] === action.payload.data[key]) return diff
        return {
          ...diff,
          [key]: action.payload.data[key]
        }
      }, {})

      return {
        ...state,
        data: {
          ...state.data,
          ...newData
        }
      }
    }
    case 'REDUX_SMART_FORM_QUERY_RESPONSE': {
      return {
        ...state,
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
    case 'REDUX_SMART_FORM_INCREMENT_STEP': {
      return {...state, step: state.step + 1}
    }
    case 'REDUX_SMART_FORM_DECREMENT_STEP': {
      return {...state, step: state.step - 1}
    }
    case 'REDUX_SMART_FORM_SUBMIT_RESPONSE': {
      return {...state, ...action.payload}
    }
    case 'REDUX_SMART_FORM_RESET_RESPONSES': {
      return {...state, error: false, response: null}
    }
    case 'REDUX_SMART_FORM_STOP_LOADING': {
      return {...state, loading: false}
    }
    case 'REDUX_SMART_FORM_RESET_FIELDS': {
      return {
        ...state,
        data: Object.keys(state.data)
          .filter(x => !action.payload.includes(x))
          .reduce((acc, current) => ({...acc, [current]: state.data[current] }), {})
      }
    }
    case 'REDUX_SMART_FORM_RESET': {
      return { step: 0, data: {}, loading: false, error: false, response: null}
    }
    default :
      return state
  }
}