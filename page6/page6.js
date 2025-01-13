
import { fetchWorkersData } from "../fetchDataAPI/fetchWorkerData.js"

const apiOrders = ("https://67701d46b353db80c3246245.mockapi.io/listUser/orders");
displayWorkerData();

async function displayWorkerData() {
    try {
        const workers = await fetchWorkersData();
        const userFatherDOM = document.getElementById('userDisplay');
        workers.forEach(users => {
            const { image, fullName, contactPerson, address, phoneNumber, backUpPhoneNumber } = users
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

            imageAvatarDOM.src = image
            fullnameDOM.textContent = fullName
            contactPersonDOM.textContent = contactPerson;
            addressDOM.textContent = address;
            phoneNumberDOM.textContent = `T +${phoneNumber}`;
            backUpphoneNumberDOM.textContent = `F +{${backUpPhoneNumber}`;
            buttonCallDOM.textContent = "ANRUFEN";
            buttonCallDOM.style.display = "block";
            buttonContactDOM.textContent = "KONTAKTFORMULAR";
            buttonContactDOM.style.display = "block";

            buttonCallDOM.onclick = () => {
                window.location.href = `tel: ${phoneNumber}`
            }
            buttonContactDOM.onclick = () => {
                selectWorker(users);
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
function selectWorker(worker) {
    const workerInforString = encodeURIComponent(JSON.stringify(worker));
    const workerInfor = `../page5/page5.html?register=true&workerInfor=${workerInforString}`;
    window.location.href = workerInfor;
}