async function injectNavbar() {
  fetch("/navbar.html").then(response => {
    return response.text()
  })
    .then(data => {
      document.querySelector("header").innerHTML = data;
    })

  let navbarHtml = await fetch("/navbar.html")
  let data = await navbarHtml.text()
  document.querySelector("header").innerHTML = data;

  const payload = localStorage.getItem("payload");
  if (payload) {
    const payload_parse = JSON.parse(payload)

    const mypage = document.getElementById("mypage")
    mypage.innerText = "마이페이지"

    const logout = document.getElementById("logout")
    logout.innerText = "로그아웃"

    let loginButton = document.getElementById("login-button")
    loginButton.style.display = "none";

    let signupButton = document.getElementById("signup-button")
    signupButton.style.display = "none";
  }
}

injectNavbar();