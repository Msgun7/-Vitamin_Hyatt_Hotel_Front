window.onload = () => {

}

// 객실 등록 필요한 데이터들을 받아오도록 
async function createRoom() {
    const name = document.getElementById("name").value;
    const max_members = parseInt(document.getElementById("max_members").value);
    const spot = document.getElementById("spot").value;
    const status = document.getElementById("status").value;
    const price = parseInt(document.getElementById("price").value);
    const description = document.getElementById("description").value;
    const img = document.getElementById("img").files[0];
    //바닐라 = documents

    const data = {
        name: name,
        max_members: max_members,
        spot: spot,
        status: status,
        price: price,
        description: description,
        img: img
    };
    console.log(data)

    response = await fetch('http://127.0.0.1:8000/manager/rooms/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}
// fetch()함수를 사용하여 HTTP 요청을 보내고 응답을 처리하는 예시 코드
// async function roomList() {
//     const response = await fetch('http://127.0.0.1:8000/manager/spot/',{
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })

//     console.log(data)
// }
