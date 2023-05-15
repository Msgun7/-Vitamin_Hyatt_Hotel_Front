// 객실 등록 필요한 데이터들을 받아오도록 
async function createRoom() {
    const name = document.getElementById("name").value;
    const max_members = parseInt(document.getElementById("max_members").value);
    const spot = document.getElementById("spot").value;
    const status = document.getElementById("status").value;
    const price = parseInt(document.getElementById("price").value);
    const description = document.getElementById("description").value;
    const img = document.getElementById("img");


    const formData = new FormData();
    formData.append("name", name,);
    formData.append("max_members", max_members);
    formData.append("spot", spot);
    formData.append("status", status);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", img.files[0]);


    response = await fetch(`http://127.0.0.1:8000/manager/rooms/`, {
        method: 'POST',
        body: formData
    })

        .then(response => response.json())

        .then(data => {
            const nameError = data.name[0] || null;
            const maxMembersError = data.max_members[0] || null;
            const descriptionError = data.description[0] || null;
            const priceError = data.price[0] || null;

            if (nameError && maxMembersError && descriptionError && priceError) {
                const errorMessage = `Name Error: ${nameError}\nMax Members Error: ${maxMembersError}\nDescription Error: ${descriptionError}\nPrice Error: ${priceError}\n`;
                alert(errorMessage);
            }
            else {
                alert("객실이 등록되었습니다.");
                window.location.reload();
            }
        })


        .catch(error => {
            alert("에러가 발생했습니다.");
        });
}
