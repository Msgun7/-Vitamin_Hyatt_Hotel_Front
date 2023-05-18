// 객실 등록 필요한 데이터들을 받아오도록 
async function createRoom() {
  const accessToken = localStorage.getItem('access')
  const name = document.getElementById("name").value;
  const max_members = parseInt(document.getElementById("max_members").value);
  const spot = document.getElementById("spot").value;
  const status = document.getElementById("status").value;
  const price = parseInt(document.getElementById("price").value);
  const description = document.getElementById("description").value;
  const img = document.getElementById("img");


  const formData = new FormData();
  formData.append("name", name,);
  formData.append("max_members", max_members);
  formData.append("spot", spot);
  formData.append("status", status);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("image", img.files[0]);


  response = await fetch(`http://127.0.0.1:8000/manager/rooms/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    method: 'POST',
    body: formData
  })

    // .then(data => {
    //   console.log("테스트")
    //   const nameError = data.name[0] || null;
    //   const maxMembersError = data.max_members[0] || null;
    //   const descriptionError = data.description[0] || null;
    //   const priceError = data.price[0] || null;

    //   if (nameError) {
    //     alert(`Name Error: ${nameError}`);
    //   } else if (maxMembersError) {
    //     alert(`Max Members Error: ${maxMembersError}`);
    //   } else if (descriptionError) {
    //     alert(`Description Error: ${descriptionError}`);
    //   } else if (priceError) {
    //     alert(`Price Error: ${priceError}`);
    //   } else {
    //     alert("객실이 등록되었습니다.");
    //     window.location.reload();
    //   }
    // })

    // .catch(error => {
    //   alert(error);
    // });

    .then(function (response) {
      if (response.status === 201) {
        // 성공적인 응답(200)의 경우 별도의 로직 실행
        return response.json();
      } else if (response.status === 400) {
        // 에러 응답(400)의 경우 서버의 JSON 데이터를 alert
        return response.json().then(function (data) {
          for (let key in data) {
            alert(`${key} : ${data[key]}`);
          }
          return Promise.reject('서버 에러')
        });
      } else {
        // 다른 상태 코드의 경우 에러 처리
        return Promise.reject('서버 응답 에러');
      }
    })
    .then(function (data) {
      // 별도의 로직 실행 (성공적인 응답인 경우에만 도달)
      console.log(data);
      alert("객실이 등록되었습니다.");
    })
    .catch(function (error) {
      // 에러 처리
      console.error(error);

      // 에러 처리 후 다른 작업을 수행하고자 한다면 여기에 작성하세요.
    });



}
