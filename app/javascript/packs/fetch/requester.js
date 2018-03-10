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
  }).then(resp => resp.json());
}
