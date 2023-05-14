checkLogin()

async function loadUserprofile() {

  const response = await getUserprofile();

  console.log(response)

  const username = document.getElementById("username")
  username.innerText = response.profile.username

  const email = document.getElementById("email")
  email.innerText = response.profile.email

  const phone = document.getElementById("phone")
  phone.innerText = response.profile.phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

  const point = document.getElementById("point")
  point.innerText = `${response.profile.point} p`

}

loadUserprofile();
getArticles();

console.log(response)

document.addEventListener("DOMContentLoaded", function () {
  console.log("테스테테슽")
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", reviewtest);
})

async function getArticles() {
  console.log("겟 테스트")
  const payload = JSON.parse(localStorage.getItem("payload")).user_id
  console.log(payload)

  const response = await fetch(`${backend_base_url}/users/mypagelist/${payload}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access")
    },
    method: 'GET',
  });
  //내 리뷰 조회
  const response_json = await response.json()
  $('#myreview_info').empty()
  console.log(response_json)
  response_json['reviews'].forEach((a) => {
    const context = a['context']
    const room = a['room']
    const title = a['title']
    const spot = a['spot']
    const star = a['stars']

    let temp_html = `<tr>
                      <th>${spot}</th>
                      <td>${room}</td>
                      <td>${title}</td>
                      <td>${context}</td>
                      <td>${star}</td>
                  </tr>`
    $('#myreview_info').append(temp_html)
  })

  //내 예약 조회 
  $('#mybook_info').empty()
  console.log(response_json)
  response_json['books'].forEach((a) => {
    const spot = a['spot']
    const room = a['room']
    const check_in = a['check_in']
    const check_out = a['check_out']
    const members = a['members']

    let temp_html = `<tr>
                      <th>${spot}</th>
                      <td>${room}</td>
                      <td>${check_in}</td>
                      <td>${check_out}</td>
                      <td>${members}</td>
                  </tr>`
    $('#mybook_info').append(temp_html)
  })


  if (response.status == 200) {
    const response_json = await response.json()
    return response_json
  } else {
    alert("불러오는데 실패했습니다!")
  }
}

async function reviewtest(event) {
  console.log("테스트")
  const booked_id = event.target.dataset.userid;
  const data = {
    "booked_id": booked_id
  };
  console.log(booked_id)
  const response = await fetch(`http://127.0.0.1:8000/users/myreservation/${booked_id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access")
    },
    method: 'POST',
    body: JSON.stringify(data)
  });

  const response_json = await response.json();
  console.log(response_json);
}

async function handleReviewCreate() {

  const title = document.getElementById('title').value;
  const context = document.getElementById('context').value;
  const star = parseInt(document.getElementById('star').value);
  console.log(title, context, star);

  const data = {
    "title": title,
    "context": context,
    "star": star
  };

  const response = await fetch(`http://127.0.0.1:8000/users/myreservation/${booked_id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access")
    },
    method: 'POST',
    body: JSON.stringify(data)
  });

  const response_json = await response.json();
  console.log(response_json);
}


