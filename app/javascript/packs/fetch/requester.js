export async function post(route, body) {
  return fetchRequest(route, 'POST', body);
}

export async function patch(route, body) {
  return fetchRequest(route, 'PATCH', body);
}

async function fetchRequest(route, method, body) {
  const bodyData = JSON.stringify(body);
  return await fetch(route, {
    method: method,
    body: bodyData,
    headers: {
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      "Content-Type": "application/json"
    },
    credentials: 'same-origin'
  }).then(resp => resp.json());
}
