// xhr request

let currentxhr = null;

export default function FormAPI(updateForm, payload) {

  if (currentxhr && payload.cancelable) {

    currentxhr.abort();
  }

  updateForm('toggleLoading')

  var xhr = new XMLHttpRequest();
  currentxhr = xhr;

  xhr.open("POST", payload.url, true);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {

    updateForm('toggleLoading')

    let response

    if (payload.property) {

      response = {
        property: payload.property,
        data: xhr.response
      }

    } else {

      response = xhr.response
    }

    if (this.readyState === XMLHttpRequest.DONE) {

      if (this.status === 200) {

        if (typeof payload.success === 'function') {

          payload.success(response)

        } else {

          updateForm(payload.success, response)
        }

      } else {

        updateForm(payload.error, response)
      }
    }
  };
  xhr.onabort = function () {

    currentxhr = null;
  };
  xhr.send(JSON.stringify(payload.data));
}