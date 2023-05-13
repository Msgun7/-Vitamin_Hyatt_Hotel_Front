window.onload = () => {

}
// 객실 등록 필요한 데이터들을 받아오도록 
async function createRoom() {
    const name = document.getElementById("name").value;
    const max_members = parseInt(document.getElementById("max_members").value);
    const spot = document.getElementById("spot").value;
    const status = document.getElementById("status").value;
    const price = parseInt(document.getElementById("price").value);
    const description = document.getElementById("description").value;
    const img = document.getElementById("img");

    console.log(img.files[0]);


    const formData = new FormData();
    formData.append("name", name,);
    formData.append("max_members", max_members);
    formData.append("spot", spot);
    formData.append("status", status);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", img.files[0]);


    console.log(formData);

    response = await fetch('http://127.0.0.1:8000/manager/rooms/', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}
