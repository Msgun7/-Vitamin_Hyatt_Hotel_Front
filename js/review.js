window.onload = async function () {
  console.log("온로드");
  // await loadUserprofile();
  await getReviews();
};

async function getReviews() {
  console.log("겟 테스트")
  // const payload = JSON.parse(localStorage.getItem("payload")).user_id
  // console.log(payload)

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
  console.log(response_json)
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

  if (response.status == 200) {
    const response_json = await response.json()
    return response_json
  } else {
    alert("불러오는데 실패했습니다!")
  }
}
/* <tr>
<th>제목</th>
<td>스위트룸</td>
</tr>
<tr>
<th>내용</th>
<td>스위트룸</td>
</tr> */