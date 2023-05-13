async function RoomviewBySpot() {
    const root_address = "http://127.0.0.1:8000";
    const fetch_url = 'http://127.0.0.1:8000/manager/roomsbyspot/' + '1'
    const response = await fetch(fetch_url, {
    });

    const response_json = await response.json();
    console.log(response_json);


    response_json.forEach((a) => {
        const roomname = a["name"];
        const price = a["price"];
        const image = root_address + a["image"];

        console.log(roomname);

        let temp = `<a href="/review_detail.html">
                <section class="cp-card content">
                    <div class="thumb" style="background-image: url(${image});">
                    </div>
                    <div class="body">
                        <h4>${roomname}</h4>
                        <div class="metadata">
                            <div class="review-rating">
                                <span class="cp-stars">
                                    ★
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

RoomviewBySpot()