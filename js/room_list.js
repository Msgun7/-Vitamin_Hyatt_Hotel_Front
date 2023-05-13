// 정수 값을 문자열로 변환하는 함수
function getSpotString(spot) {
    switch (spot) {
        case 1:
            return '고양점'
        case 2:
            return '대구점'
        case 3:
            return '세종점'
        case 4:
            return '양주점'
        case 5:
            return '포항점'
        default:
            return ''
    }
}

async function roomList() {
    const accessToken = localStorage.getItem('access')
    const response = await fetch('http://127.0.0.1:8000/manager/rooms/', {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        method: 'GET',
    })

    const response_json = await response.json()

    response_json.forEach((a) => {
        const spot = getSpotString(a['spot']) // 문자열로 변환된 지점 정보
        const name = a['name']
        const price = a['price']
        const max_members = a['max_members']
        const status = a['status']


        let temp_html = `<tr>
                            <th>${a.id}</th>
                            <th>${spot}</th>
                            <th>${name}</th>
                            <td>${price}</td>
                            <td>${max_members}</td>
                            <td>${status}</td>
                            <td><button onclick="changeStatus(${a.id}, '${status === 'empty' ? 'checkin' : 'empty'}')">객실상태 변경</button></td>
                        </tr>`
        $('#room_info').append(temp_html)
    })
}
// 객실상태 변경 버튼을 클릭했을시 patch로 데이터 베이스의 값을 바꿀 수 있도록 하였습니다.
async function changeStatus(id, status) {
    const response = await fetch(`http://127.0.0.1:8000/manager/rooms/${id}/`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0MDAyMDYxLCJpYXQiOjE2ODM5NTg4NjEsImp0aSI6ImQ4ZDExZGNkZGU1MTRjOTZiYTk2ZDUzNGI0ZGFlODdmIiwidXNlcl9pZCI6MiwiZW1haWwiOiJhZG1pbkBuYXZlci5jb20iLCJ1c2VybmFtZSI6IiJ9.N0xxMLRSuuFb8twAuqubn0IKpwReV7ogsfnvdxOK-2A`
        },
        method: 'PATCH',
        body: JSON.stringify({ status }),
    })

    const response_json = await response.json()
    console.log(response_json)
    window.location.reload()
}

roomList()