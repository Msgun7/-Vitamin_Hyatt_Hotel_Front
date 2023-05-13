$(document).ready(function () {
  calendarInit();
  console.log("하이하이")
  async function calendarInit() {
    const response = await fetch(`http://127.0.0.1:8000/manager/cal/1/`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    })

    const response_json = await response.json()
    console.log(response_json)
    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체


    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);

    // 캘린더 렌더링
    renderCalender(thisMonth);

    async function renderCalender(thisMonth) {


      // 렌더링을 위한 데이터 정리
      currentYear = thisMonth.getFullYear();
      currentMonth = thisMonth.getMonth();
      currentDate = thisMonth.getDate();

      // 이전 달의 마지막 날 날짜와 요일 구하기
      var startDay = new Date(currentYear, currentMonth, 0);
      var prevDate = startDay.getDate();
      var prevDay = startDay.getDay();

      // 이번 달의 마지막날 날짜와 요일 구하기
      var endDay = new Date(currentYear, currentMonth + 1, 0);
      var nextDate = endDay.getDate();
      var nextDay = endDay.getDay();

      // console.log(prevDate, prevDay, nextDate, nextDay);

      // 현재 월 표기
      $('.year-month').text(currentYear + '.' + (currentMonth + 1));

      // 렌더링 html 요소 생성
      calendar = document.querySelector('.dates')
      calendar.innerHTML = '';

      // 지난달
      for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
      }
      // 이번달
      for (var i = 1; i <= nextDate; i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
      }
      // 다음달
      for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
        calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
      }

      // 예약 불가능한 날짜 표시
      // console.log(response_json['book_set'])
      response_json['book_set'].forEach((a) => {
        let check_in = new Date(a['check_in']); // 체크인 날짜
        let check_in_year = check_in.getFullYear()
        let check_in_month = check_in.getMonth()
        let check_in_day = check_in.getDate()

        let check_out = new Date(a['check_out']); // 체크아웃 날짜
        let check_out_year = check_out.getFullYear()
        let check_out_month = check_out.getMonth()
        let check_out_day = check_out.getDate()

        console.log(check_in, check_out)
        // 예약한 날짜에 해당하는 달에만 보여줌
        if (check_in_month === thisMonth.getMonth() || check_out_month === thisMonth.getMonth()) {
          if (check_in_year === thisMonth.getFullYear()) {
            let startDay = (check_in_month === thisMonth.getMonth()) ? check_in.getDate() : 1; // 체크인 날짜의 일
            let endDay = (check_out_month === thisMonth.getMonth()) ? check_out.getDate() : getMonthLastDate(thisMonth); // 체크아웃 날짜의 일

            for (let i = startDay; i <= endDay; i++) {
              let currentMonthDate = document.querySelectorAll('.dates .current');
              currentMonthDate[i - 1].classList.add('today');
            }
          }
        }
      });
    }

    function getMonthLastDate(date) {
      let nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return nextMonth.getDate();
    }

    // 이전달로 이동
    $('.go-prev').on('click', function () {
      thisMonth = new Date(currentYear, currentMonth - 1, 1);
      renderCalender(thisMonth);
    });

    // 다음달로 이동
    $('.go-next').on('click', function () {
      thisMonth = new Date(currentYear, currentMonth + 1, 1);
      renderCalender(thisMonth);
    });
  }


});
/*
달력 렌더링 할 때 필요한 정보 목록
현재 월(초기값 : 현재 시간)
금월 마지막일 날짜와 요일
전월 마지막일 날짜와 요일
*/
