
const apiURLWorkers = ("https://67701d46b353db80c3246245.mockapi.io/listUser/workers");
const apiOrder = ("https://67701d46b353db80c3246245.mockapi.io/listUser/orders");
displayWorkerData();

async function displayWorkerData() {
    try {
        const workers = await fetchWorkersData();
        console.log(workers);
        const userFatherDOM = document.getElementById('userDisplay');
        workers.forEach(users => {
            const imageAvatarDOM = document.createElement("img");

            const fullnameDOM = document.createElement("p");
            const contactPersonDOM = document.createElement("p");
            const addressDOM = document.createElement("p");
            const phoneNumberDOM = document.createElement("p");
            const backUpphoneNumberDOM = document.createElement("p");
            const buttonCallDOM = document.createElement("button");
            const buttonContactDOM = document.createElement("button");

            buttonCallDOM.className = "button";
            buttonContactDOM.className = "button";

            imageAvatarDOM.src = users.image;
            fullnameDOM.textContent = users.fullName;
            contactPersonDOM.textContent = users.contactPerson;
            addressDOM.textContent = users.address;
            phoneNumberDOM.textContent = `T +${users.phoneNumber}`;
            backUpphoneNumberDOM.textContent = `F +{${users.backUpPhoneNumber}`;
            buttonCallDOM.textContent = "ANRUFEN";
            buttonCallDOM.style.display = "block";
            buttonContactDOM.textContent = "KONTAKTFORMULAR";
            buttonContactDOM.style.display = "block";

            buttonCallDOM.onclick = () => {
                window.location.href = `tel: ${users.phoneNumber}`
            }
            buttonContactDOM.onclick = () => {
                console.log("buttonContactDOM hoat dong", users.id);
            }

            userFatherDOM.appendChild(imageAvatarDOM);
            userFatherDOM.appendChild(fullnameDOM);
            userFatherDOM.appendChild(contactPersonDOM);
            userFatherDOM.appendChild(addressDOM);
            userFatherDOM.appendChild(phoneNumberDOM);
            userFatherDOM.appendChild(backUpphoneNumberDOM);
            userFatherDOM.appendChild(buttonCallDOM);
            userFatherDOM.appendChild(buttonContactDOM);
        });
    } catch (error) {
        console.log(`Error;`, error);
    }
}

async function fetchWorkersData() {
    try {
        const reponse = await fetch(apiURLWorkers);
        return await reponse.json();

    } catch (error) {
        console.log(error);
    }
}
async function fetchOrdersData() {
    try {
        const reponse = await fetch();
        return await reponse.json()
    } catch (error) {
        console.log(error);
    }
}
