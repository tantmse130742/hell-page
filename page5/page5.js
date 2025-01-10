function customerAccount(fullName, name, surname, email, phoneNumber, backUpPhoneNumber, elevatorLocation, description) {
    this.fullName = fullName;
    this.name = name;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.elevatorLocation = elevatorLocation;
    this.backUpPhoneNumber = backUpPhoneNumber;
    this.description = description;
    this.image = null;
    this.idWorkerContact = "";
}
const apiOrderURL = ("https://67701d46b353db80c3246245.mockapi.io/listUser/orders");
const emailRegex = /^\w+([,.-]\w+)*@\w+(\.\w+)$/;
const phoneNumberRegex = /^\d{3}[.-\s]?\d{3}[.-\s]?\d{4}$/;
submitButton();
function submitButton() {
    document.getElementById('register-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const backUpPhoneNumber = document.getElementById('backUpPhoneNumber').value;
        const emailInput = document.getElementById('email').value;
        const phoneNumber = document.getElementById('number').value;
        const usernameInput = document.getElementById('username').value;
        const nameInput = document.getElementById('name').value;
        const surnameInput = document.getElementById('surname').value;
        const locationOfElevatorSystem = document.getElementById('locationOfElevatorSystem').value;
        if (!usernameInput || !nameInput || !surnameInput) {
            window.alert("Please fill the username, name and surname")
        }
        else if (!(vaildationEmail(emailInput))) {
            window.alert(`${emailInput} is not verified please try agian`);
            return;
        }
        else if (!(validationNumber(phoneNumber))) {
            window.alert(`${phoneNumber} Phone number is not verifed please try agian`);
            return;
        }
        else if (!locationOfElevatorSystem) {
            window.alert("Please give us know the location you want to setup Elevator");
            return;
        }
        else if (!backUpPhoneNumber) {
            window.alert("Please fill your back up phone number");
            return;
        }
        else if (!fileInput || !fileInput.files || fileInput.files.length == 0) {
            window.alert("PLease verify your images");
            return;
        }
        else {
            const formData = new FormData(this);
            const customerInfortion = new customerAccount(
                formData.get('fullName'),
                formData.get('name'),
                formData.get('surname'),
                formData.get('email'),
                formData.get('phoneNumber'),
                formData.get('backUpPhoneNumber'),
                formData.get('elevatorLocation'),
                formData.get('description'),
            );
            converFileToBase64(customerInfortion, apiOrderURL)
            window.alert("Register succeed!");
        }
    })
}

async function addUserAccountToAPI(user, url, base64String) {
    try {
        const reponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: user.fullName,
                name: user.name,
                surname: user.surname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                elevatorLocation: user.elevatorLocation,
                backUpPhoneNumber: user.backUpPhoneNumber,
                description: user.description,
                image: base64String,
                idWorkerContact: "",
            })
        })
        const data = await reponse.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error)
    }

}

function converFileToBase64(user, url) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    try {
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            addUserAccountToAPI(user, url, base64);
        }
    } catch (error) {
        console.error("error");
    }

}

function displayImageOnInput() {
    const fileInput = document.getElementById('fileInput')
    const file = fileInput.files[0];
    const reader = new FileReader();
    try {
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            const labelDOM = document.getElementById('label')
            const inputFileContainerDOM = document.getElementById('inputFileContainer');

            const imgDOM = document.createElement("img")
            const removeImgDOM = document.createElement("button")

            removeImgDOM.textContent = "remove image"
            imgDOM.src = `data:image/svg+xml;base64,${base64}`;
            imgDOM.style.width = "80px";
            imgDOM.style.height = "80px";
            removeImgDOM.style.border = "none";
            removeImgDOM.style.display = "block";

            labelDOM.appendChild(imgDOM);
            labelDOM.appendChild(removeImgDOM);

            if (file) {
                inputFileContainerDOM.style.display = "none";
                removeImgDOM.onclick = (event) => {
                    event.preventDefault();
                    imgDOM.style.display = "none";
                    removeImgDOM.style.display = "none";
                    inputFileContainerDOM.style.display = "block";
                }
            }
        }
    } catch (error) {
        console.error("error");
    }
}
function vaildationEmail(emailInput) {
    return emailRegex.test(emailInput);
}
function validationNumber(phoneNumberInput) {
    return phoneNumberRegex.test(phoneNumberInput);
}

async function fecthData() {
    try {
        const respone = await fetch(apiOrderURL);
        const data = await respone.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}







