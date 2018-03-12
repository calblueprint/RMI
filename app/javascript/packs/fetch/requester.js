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
  return doFetchRequest(route, 'POST', body);
}

export async function patch(route, body) {
  return doFetchRequest(route, 'PATCH', body);
}

/**
 *
 * @param route         Route for the request (e.g. /answers/11)
 * @param method        Method to use ('GET', 'POST', etc.)
 * @param body          Request body. Can be left undefined, for example for GET requests.
 *
 * @returns {Promise.<*>}   A promise that resolves to the JSON response if the request was successful.
 */
async function doFetchRequest(route, method, body) {
  const bodyData = JSON.stringify(body);
  return await fetch(route, {
    method: method,
    body: bodyData,
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }).then(function success(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status + " " + response.statusText);
  });
}
