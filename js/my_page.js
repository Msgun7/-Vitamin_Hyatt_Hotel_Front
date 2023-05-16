checkLogin()

// // 기본 URL
// const backend_base_url = "http://127.0.0.1:8000"
// // const backend_base_url = "http://ec2-3-39-193-171.ap-northeast-2.compute.amazonaws.com:8000"
// const frontend_base_url = "http://127.0.0.1:5500"


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

//마이페이지 내 리뷰&예약 내역 조회
async function getArticles() {
  const payload = JSON.parse(localStorage.getItem("payload")).user_id

  const response = await fetch(`http://127.0.0.1:8000/users/mypagelist/${payload}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access")
    },
    method: 'GET',
  });

  //내 리뷰 조회
  const response_json = await response.json()
  $('#myreview_info').empty()
  response_json['reviews'].forEach((a) => {
    const room = a['room']
    const title = a['title']
    const spot = a['spot']
    const star = a['stars']
    const review_id = a['id']

    let temp_html = `<tr>
                      <th>${spot}</th>
                      <td>${room}</td>
                      <td>${title}</td>
                      <td>${star}</td>
                      <td><a class="cp-button secondary" type="button" onclick="getDetailReview(${review_id})" data-bs-toggle="modal" data-bs-target="#myreview">상세</a></td>
                  </tr>
`
    $('#myreview_info').append(temp_html)
  })

  const today = new Date()
  //내 예약 조회
  response_json['books'].forEach((a) => {
    const spot = a['spot']
    const room = a['room']
    const check_in = new Date(a['check_in'])
    const check_out = new Date(a['check_out'])
    const book_id = a['id']

    let temp_html = `<tr>
                    <th>${spot}</th>
                    <td>${room}</td>
                    <td>${check_in.toLocaleDateString()}</td>
                    <td>${check_out.toLocaleDateString()}</td>
                    <td><a class="cp-button secondary" type="button" onclick="getDetailBook(${book_id}), savedBookId(${book_id});"  data-bs-toggle="modal" data-bs-target="#mybook"
                    style="width: 120px; font-size:15px" >예약상세</a></td>
                  </tr>
  `


    let mybook_temp_html = `<tr>
                                        <th>${spot}</th>
                                        <td>${room}</td>
                                        <td>${check_in.toLocaleDateString()}</td>
                                        <td>${check_out.toLocaleDateString()}</td>
                                        <td><a class="cp-button secondary" type="button" onclick="createReview(${book_id});" data-bs-toggle="modal" data-bs-target="#myreview"
                                        style="width: 120px; font-size:13px" data-bs-dismiss="modal">예약 후기를 남겨주세요.</a></td>
                                    </tr>
                    `
    if (check_out < today) {
      $('#mybook_info').append(mybook_temp_html)
    } else if (check_in <= today && today <= check_out) {
      $('#current_book_info').append(temp_html)

    } else {
      $('#current_book_info').append(temp_html)
    }
  })
}

loadUserprofile();
getArticles();

async function getDetailBook(book_id) {

  const response = await fetch(`http://127.0.0.1:8000/users/myreservation/${book_id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access")
    },
    method: 'GET',
  });
  //해당 숙소 예약 조회
  const response_json = await response.json()
  $('#myreservation-info').empty()
  const user = response_json['user']
  const room = response_json['room']
  const spot = response_json['spot']
  const check_in = response_json['check_in']
  const check_out = response_json['check_out']
  const members = response_json['members']
  const booked_id = response_json['id']
  let temp_html = `
                      <p class="content">이메일 : ${user}</p>
                      <p class="content">지점 : ${spot}</p>
                      <p class="content">객실 : ${room}</p>
                      <p class="content">check_in : ${check_in}</p>
                      <p class="content">check_out : ${check_out}</p>
                      <p class="content">인원 : ${members}</p>
                      `
  $('#myreservation-info').append(temp_html)


  if (response.status == 200) {
    const response_json = await response.json()
    return response_json
  } else {
    alert("불러오는데 실패했습니다!")
  }
}

async function createReview(book_id) {
  document.getElementById('reviewsavediv');
  $('#reviewsavediv').empty();
  let temp_html = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소하기
            </button>
            <button type="button" id="myreview-save" class="btn btn-primary" data-bs-dismiss="modal" style="float: right"
              onclick="handleReviewCreate(${book_id})">
              Save
            </button>
    `
  $('#reviewsavediv').append(temp_html);

}


//예약한 숙소 리뷰 작성
async function handleReviewCreate(book_id) {

  const title = document.getElementById('title').value;
  const context = document.getElementById('context').value;
  const stars = parseInt(document.getElementById('stars').value);

  const data = {
    "title": title,
    "context": context,
    "stars": stars
  };

  const response = await fetch(`http://127.0.0.1:8000/users/myreservation/${book_id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access")
    },
    method: 'POST',
    body: JSON.stringify(data)
  });

  const response_json = await response.json();
  console.log(response_json);
  createReview(book_id);
  window.location.reload()
}


//내 리뷰 상세 조회 
async function getDetailReview(review_id) {

  const response = await fetch(`http://127.0.0.1:8000/users/myreservation/Detail/${review_id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access")
    },
    method: 'GET',
  });
  //해당 숙소 예약 조회
  const response_json = await response.json()
  $('#myreview-info').empty()
  const user = response_json['user']
  const room = response_json['room']
  const spot = response_json['spot']
  const title = response_json['title']
  const context = response_json['context']
  const stars = response_json['stars']
  let temp_html = `
                      <p class="content">이메일 : ${user}</p>
                      <p class="content">지점 : ${spot}</p>
                      <p class="content">객실 : ${room}</p>
                      <p class="content">제목 : ${title}</p>
                      <p class="content">내용 : ${context}</p>
                      <p class="content">별점 : ${stars}</p>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소하기
                      </button>
                      <div class="modal-footer">`

  $('#myreview-info').append(temp_html)


  if (response.status == 200) {
    const response_json = await response.json()
    return response_json
  } else {
    alert("불러오는데 실패했습니다!")
  }
}
var savedBookId;
function savedBookId(book_id) {
  savedRoomId = book_id;
  document.getElementById('reservationdeletediv');
  console.log(book_id);

  $('#reservationdeletediv').empty();
  let temp_html = `
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> 닫기
                  </button>
                  <button type="button" class="btn btn-primary" style="float: right" onclick="handleReservationDelete(${book_id})">
                    예약취소
                  </button>
    `
  $('#reservationdeletediv').append(temp_html);
}

async function handleReservationDelete(book_id) {
  let token = localStorage.getItem("access")
  console.log(book_id);

  const response = await fetch(`http://127.0.0.1:8000/manager/rooms/book/${book_id}/`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: 'DELETE',
  })
  if (response.status == 204) {
    alert("예약 취소가 정상적으로 처리되었습니다!")
    location.reload()
  } else {

  }

}