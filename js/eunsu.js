
async function RoomviewBySpot(event) {
  var spotId = event.target.id.slice(-1);
  const root_address = "http://127.0.0.1:8000"; // 여기에 자신의 루트 주소를 입력하세요
  const fetch_url = "http://127.0.0.1:8000/manager/roomsbyspot/" + spotId;
  const response = await fetch(fetch_url, {});
  var targetDiv = document.getElementById('contents_id');
  
  var dropdown = document.getElementById("navbarDropdown");
  targetDiv.innerHTML = ''
  dropdown.textContent = event.target.textContent

  const response_json = await response.json();

  response_json.forEach((a) => {
    const roomname = a["name"];
    const price = a["price"];
    var star = a['avg_star']
    var starval = "★ x" + star;
    if (star == 0) {
        var starval = "아직 별점이 없음";
    }
    const image = root_address + a["image"];
    let temp = `<a href="/review_detail.html">
                <section class="cp-card content">
                    <div class="thumb" style="background-image: url(${image});">
                    </div>
                    <div class="body">
                        <h4>${roomname}</h4>
                        <div class="metadata">
                            <div class="review-rating">
                                <span class="cp-stars">
                                    ${starval}
                                </span>
                            </div>
                            <div class="review-author">
                                <span>${price}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </a>`;
    $("#contents_id").append(temp);
  });
}



