async function RoomviewBySpot(event) {
    var spotId = 1; // 기본 값으로 고양점 선택
    if (event && event.target) {
        spotId = event.target.id.slice(-1);
    }

    const root_address = `http://127.0.0.1:8000`;
    const fetch_url = `http://127.0.0.1:8000/manager/roomsbyspot/` + spotId;
    const response = await fetch(fetch_url, {});
    var targetDiv = document.getElementById('contents_id');

    var dropdown = document.getElementById("navbarDropdown");
    targetDiv.innerHTML = '';
    dropdown.textContent = event ? event.target.textContent : '고양점'; // 이 부분을 수정합니다.

    const response_json = await response.json();


    response_json.forEach((a) => {
        const roomname = a["name"];
        const price = a["price"];
        const formattedPrice = price.toLocaleString('ko-KR') + '원'
        var star = a['avg_star']
        var starval = "★".repeat(star);
        if (star == 0) {
            var starval = "아직 별점이 없음";
        }
        const image = root_address + a["image"];
        const roomid = a["id"]

        // 변수 하나를 0으로 해서 count ++
        let temp = `<a href = "/review_detail.html?room_id=${roomid}" >
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
    <span>${formattedPrice}</span>
    </div>
    </div>
    </div>
    </section>
    </a > `;
        $("#contents_id").append(temp);
    });
}

RoomviewBySpot();