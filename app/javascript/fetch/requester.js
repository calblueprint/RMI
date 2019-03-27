/**
 * Contains async functions for standard HTTP requests.
 *
 * IMPORTANT:
 * Each requester function returns a promise that resolves to the JSON response if successful.
 * However, it will throw an error if a non-200 response is received.
 * Any code that uses requester functions needs to catch and handle this case explicitly.
 */

export async function get(route) {
  return doFetchRequest(route, 'GET');
}

export async function destroy(route) {
  return doFetchRequest(route, 'DELETE');
}

export async function post(route, body) {
  return doFetchRequest(route, 'POST', JSON.stringify(body));
}

/**
 * Sends a post request with a file rather than JSON as its contents.
 *
 * @param route     API route
 * @param body      A FormData object with the request params
 */
export async function postFile(route, body) {
  return doFetchRequest(route, 'POST', body, true);
}

export async function patch(route, body) {
  return doFetchRequest(route, 'PATCH', JSON.stringify(body));
}

/**
 *
 * @param route               Route for the request (e.g. /answers/11)
 * @param method              Method to use ('GET', 'POST', etc.)
 * @param body                Request body. Can be left undefined, for example for GET requests.
 * @param ignoreContentType   If true, will send the request without a specified content type. Can be helpful
 *                              for things like form data, where we want it to infer the type and settings.
 * @param toJson              If true, will convert response to JSON
 *
 * @returns {Promise.<*>}   A promise that resolves to the JSON response if the request was successful.
 */
async function doFetchRequest(route, method, body, ignoreContentType=false, toJson=true) {
  let responseObj;
  const headers = {
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
  };
  if (!ignoreContentType) {
    headers['Content-Type'] = 'application/json';
  }

  return await fetch(route, {
    method,
    body,
    headers,
    credentials: 'same-origin'
  }).then((response) => {
    responseObj = response;
    if (!response.ok) {
      throw new Error(responseObj.status + " failed request error")
    }

    if (toJson) return responseObj.json();
    else return responseObj;
  }).catch(_ => {
    if (responseObj) {
      return responseObj.json().then(response => {
        throw response.errors;
      });
    }
    else {
     throw new Error("A fetch error occurred.");
    }
  })

}
