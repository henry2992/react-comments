const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'dbhc9rjkkd8'
}

export function getCategories () {
  console.log('hola');
  fetch(`${api}/categories`, { headers })
    .then((res) => res.json())
    .then(data => data)
}
