window.onload = () => {
    GetRoom()
}

async function GetRoom() {
    const accessToken = localStorage.getItem('access')
    const response = await fetch(`http://127.0.0.1:8000/manager/rooms/`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        method: 'GET',
    })
    const response_json = await response.json()
    response_json.forEach((a) => {
        let id = a['id']
        let name = a['name']
        let temp_html = `<option value="${id}">${name}</option>`
        $('#select_room').append(temp_html)
    })
    // 
}



async function bookUserList() {
    const accessToken = localStorage.getItem('access')
    const room_id = document.getElementById("select_room").value
    const response = await fetch(`http://127.0.0.1:8000/manager/customers/${room_id}/`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        method: 'GET',
    })

    const response_json = await response.json()
    console.log(response_json)

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