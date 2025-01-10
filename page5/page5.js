function customerAccount(fullName, name, surname, email, phonenumber, elevatorLocation, phoneBackUp, description) {
    this.fullName = fullName;
    this.name = name;
    this.surname = surname;
    this.phonenumber = phonenumber;
    this.email = email;
    this.elevatorLocation = elevatorLocation;
    this.phoneBackUp = phoneBackUp;
    this.description = description;
    this.image = null;
}
const apiURL = ("https://67701d46b353db80c3246245.mockapi.io/api/api");
const emailRegex = /^\w+([,.-]\w+)*@\w+(\.\w+)$/;
const phoneNumberRegex = /^\d{3}[.-\s]?\d{3}[.-\s]?\d{4}$/;
fecthData();
submitButton();
function submitButton() {
    document.getElementById('register-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const emailInput = document.getElementById('email').value;
        const phoneNumber = document.getElementById('number').value;
        const usernameInput = document.getElementById('username').value;
        const nameInput = document.getElementById('name').value;
        const surnameInput = document.getElementById('surname').value;
        const locationOfElevatorSystem = document.getElementById('locationOfElevatorSystem').value;
        if (!fileInput || !fileInput.files || fileInput.files.length == 0) {
            window.alert("PLease verify your images");
            return;
        }
        else if (!usernameInput || !nameInput || !surnameInput) {
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
            return; ''
        }
        else {
            const formData = new FormData(this);
            const customerInfortion = new customerAccount(
                formData.get('fullName'),
                formData.get('name'),
                formData.get('surname'),
                formData.get('email'),
                formData.get('phonenumber'),
                formData.get('elevatorLocation'),
                formData.get('phoneBackUp'),
                formData.get('description'),
            );
            converFileToBase64(customerInfortion, apiURL)
            this.reset();
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
                phonenumber: user.phonenumber,
                elevatorLocation: user.elevatorLocation,
                phoneBackUp: user.phoneBackUp,
                description: user.description,
                image: base64String
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
        const respone = await fetch(apiURL);
        const data = await respone.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}







