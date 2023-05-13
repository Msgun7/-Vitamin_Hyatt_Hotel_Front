async function loadUserprofile() {

    const response = await getUserprofile();

    const username = document.getElementById("username")
    username.innerText = response.profile.username

    const email = document.getElementById("email")
    email.innerText = response.profile.email

    const phone = document.getElementById("phone")
    phone.innerText = response.profile.phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

    const point = document.getElementById("point")
    point.innerText = `${response.profile.point} p`

}

window.onload = async function () {
    await loadUserprofile();
}
