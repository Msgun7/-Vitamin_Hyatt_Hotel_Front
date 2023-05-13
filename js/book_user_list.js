window.onload = () => {
  roomCategory()
}
async function roomCategory() {
  const accessToken = localStorage.getItem('access')
  const response = await fetch(`http://127.0.0.1:8000/manager/rooms/`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    method: 'GET',
  })
  const response_json = await response.json()
  console.log(response_json)

  response_json.forEach((a) => {
    const name = a['name']
    const id = a['id']
    console.log(name, id)
    let temp_html = `<option value="${id}">${name}</option>`
    $('#selet_room_category').append(temp_html)
  })
}


async function bookUserList() {
  const room_id = $('#selet_room_category').val()
  console.log(room_id)
  if (room_id != -1) {
    const response = await fetch(`http://127.0.0.1:8000/manager/customers/${room_id}/`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzOTk5ODYyLCJpYXQiOjE2ODM5NTY2NjIsImp0aSI6ImM1NjY3MThhYjM2ODQ1ODZiZTBhNzA0MGQyYzRiNGFhIiwidXNlcl9pZCI6MSwiZW1haWwiOiJrbXk5ODEwQG5hdmVyLmNvbSIsInVzZXJuYW1lIjoiXHVhZTQwXHViYmY4XHVjNjAxIn0.5Z4pffF0R8NnBN3KTNaeGNlrHQ7Q2_2SsuzZ0B-UbkI`
      },
      method: 'GET',
    })
    const response_json = await response.json()
    $('#book_info').empty()
    response_json['book_set'].forEach((a) => {
      const num = a['id']
      const check_in = a['check_in']
      const check_out = a['check_out']
      const username = a['user_set']['username']
      const phone = a['user_set']['phone']
      const status = response_json['status']

      let temp_html = `<tr>
                            <th>${num}</th>
                            <td>${username}</td>
                            <td>${phone}</td>
                            <td>${check_in}</td>
                            <td>${check_out}</td>
                            <td>${status}</td>
                        </tr>`
      $('#book_info').append(temp_html)
    })
  }
}