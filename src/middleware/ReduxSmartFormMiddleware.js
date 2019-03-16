import axios from 'axios'

let source = undefined

const ReduxSmartFormMiddleware = ({ dispatch, getState }) => next => action => {

  let { type, payload, success, error, loader, stopLoader, callbackIsFunction } = action

  let property = null

  if (type === 'FETCH') {

    if (action.meta) {

      property = action.meta.property

      if (action.meta.cancelable && source !== undefined) {

        source.cancel()
      }
    }

    const CancelToken = axios.CancelToken

    source = CancelToken.source()

    dispatch(loader())

    axios({
      ...payload,
      ...{ cancelToken: source.token }
    }).then(response => {

      dispatch(stopLoader())

      if (callbackIsFunction) {

        success(response.data)

      } else {

        dispatch(success(!!property ? {success: response.data, property} : response.data))
      }

    }).catch(err => {

      dispatch(stopLoader())

      if (!axios.isCancel(err)) {

        dispatch(error(!!property ? {error: err.response.data, property} : err.response.data))
      }
    })
  }

  return next(action)
}

export default ReduxSmartFormMiddleware