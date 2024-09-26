// Grabbing elements throught their ids
const form = document.querySelector('#signup');
let name = document.querySelector('#name')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
const para = document.querySelector('#message')

// Adding an eventListener against the form object
form.addEventListener('submit', sendData)

// Callback functiont against eventListener sendData
async function sendData(e) {
    try {
        e.preventDefault()
        para.textContent = ''
        const dataObj = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        console.log(dataObj)

        //To register entries of new users into the databse
        const response = await axios.post('http://localhost:2203/user/signup', dataObj)

        // Displaying the message on the screen
        para.textContent = response.data.message;
        
        // setting the fields empty
        name.value = ""
        email.value = ""
        password.value = ""

    } catch (error) {
        para.textContent = error.message + ' : The USER ALREADY EXISTS !!!'
    }
}