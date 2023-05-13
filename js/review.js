window.onload = async function () {
  console.log("온로드");
  // await loadUserprofile();
  await getReviews();
};

async function getReviews() {
  console.log("겟 테스트")

  const response = await fetch(`${backend_base_url}/reviews/room/1/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("access")
    },
    method: 'GET',
  });
  //해당 숙소 리뷰 조회
  const response_json = await response.json()
  $('#roomreview_info').empty()
  response_json['review_set'].forEach((a) => {
    const username = a['user']
    const title = a['title']
    const context = a['context']
    const star = a['stars']

    let temp_html = `<tr>
                      <th>${username}</th>
                      <td>${title}</td>
                      <td>${context}</td>
                      <td>${star}</td>
                  </tr>`
    $('#roomreview_info').append(temp_html)
  })

  $('#detailroom-info').empty()
  console.log(response_json)
  const name = response_json['name']
  const description = response_json['description']
  const price = response_json['price']
  const max_members = response_json['max_members']

  let temp_html = `
                      <h3>${name}</h3>
                      <p class="content">설명 : ${description}</p>
                      <p class="content">가격 : ${price}</p>
                      <p class="content">인원 : ${max_members}</p>`
  $('#detailroom-info').append(temp_html)


  if (response.status == 200) {
    const response_json = await response.json()
    return response_json
  } else {
    alert("불러오는데 실패했습니다!")
  }
}

