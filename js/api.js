window.onload = () => {
    console.log('자바스크립트 불러왔음!')
}

async function handleSignup() {
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const phone = document.getElementById("phone").value
    console.log(username, email, password, password2, phone)

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "password2": password2,
            "phone": phone
        })
    })

    if (response.status == 201) {
        document.getElementById("signup").querySelector('[data-bs-dismiss="modal"]').click();
        alert("회원가입이 완료되었습니다!")
    }
    else {

        const response_json = await response.json()

        const regex = /string='([^']+)'/;
        const match = JSON.stringify(response_json).match(regex)
        console.log(match)

        if (match && match.length > 1) {
            const cleanedString = match[1].replace("string=", "");
            alert("※ " + cleanedString);

        }
    }

}

// 로그인
async function handleSignin() {
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value

    const response = await fetch(`${backend_base_url}/users/login/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })

    if (response.status == 200) {
        const response_json = await response.json()

        console.log(response_json)

        // localstorage에 저장하기
        localStorage.setItem('refresh', response_json.refresh)
        localStorage.setItem('access', response_json.access)

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''))

        localStorage.setItem('payload', jsonPayload)
        document.getElementById("login").querySelector('[data-bs-dismiss="modal"]').click();
        location.reload()
    }
    else {
        alert("※이메일 혹은 비밀번호가 올바르지 않습니다!")
    }
}

// 로그아웃
function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.replace(`${frontend_base_url}/index.html`)
}

// 마이페이지 유저프로필 - 유저아이디 불러오기
async function getUserprofile() {
    let token = localStorage.getItem("access")
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    const response = await fetch(`${backend_base_url}/users/mypagelist/${payload_parse.user_id}/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'GET'
    })

    if (response.status == 200) {
        const response_json = await response.json()
        console.log("성공")
        return response_json
    } else {
        alert("불러오는데 실패했습니다")
    }
}

// 유저 정보 수정
async function updateUserprofile() {

    let token = localStorage.getItem("access")
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse.email)
    console.log("1")

    const password = document.getElementById('newpassword').value;
    const phone = document.getElementById('newphone').value;

    const bodyData = {};
    if (password) {
        bodyData.password = password;
    }
    if (phone) {
        bodyData.phone = phone;
    }

    const response = await fetch(`${backend_base_url}/users/mypagelist/${payload_parse.user_id}/`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(bodyData)
    })
    console.log(response)

    if (response.status == 200) {
        alert("회원정보가 변경되었습니다!")
        location.reload()
    }
    else if (response.status === 400) {
        const response_json = await response.json();

        if (response_json.phone) {
            const phone_error_message = response_json.phone[0];
            alert(`※ ${phone_error_message}`);
        }
        else if (response_json.password) {
            const password_error_message = response_json.password[0];
            alert(`※ ${password_error_message}`);
        } else {
            alert("※ 에러가 발생하였습니다.");
        }
    }
    else {
        alert("※ 변경할 사항을 입력해주세요!");
    }
}

// 회원탈퇴
async function handlesUserDelete() {
    let token = localStorage.getItem("access")
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    const response = await fetch(`${backend_base_url}/users/mypagelist/${payload_parse.user_id}/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'DELETE',
    })

    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.replace(`${frontend_base_url}/index.html`)
}

// 로그인 여부 체크
function checkLogin() {
    const payload = localStorage.getItem("payload");
    if (!payload) {
        window.location.replace(`${frontend_base_url}/index.html`)
    }
}

// 관리자계정인지 판단
function checkAdmin() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse.is_admin)

    if (payload_parse.is_admin === false) {
        window.location.replace(`${frontend_base_url}/index.html`)
    }
}