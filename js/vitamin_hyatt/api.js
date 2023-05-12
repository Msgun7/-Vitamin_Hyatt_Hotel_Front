// 기본 URL
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

window.onload = () => {
    console.log('자바스크립트 불러왔음!')
}

// 그냥 맨처음에 들어가면 로그인/회원가입 

// 회원가입이 된 유저가 로그인을 하고나면 마이페이지/로그아웃 이렇게 뜨도록


// 회원가입 --> 잘못입력했을 때 에러메세지 띄우기
async function handleSignup() {
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const phone = document.getElementById("phone").value

    const autoHyphen = (phone) => {
        return phone.replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "");
    }

    const phoneWithHyphen = autoHyphen(phone)

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
            "phone": phoneWithHyphen
        })
    })

    if (response.status == 201) {
        document.getElementById("signup").querySelector('[data-bs-dismiss="modal"]').click();
    }
    else {
        const response_json = await response.json()

        console.log(response_json)

        alert(response_json[ErrorDetail])

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
    window.location.replace(`${frontend_base_url}/vitamin_hyatt/index.html`)
}

function checkLogin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontend_base_url}/vitamin_hyatt/index.html`)
    }
}