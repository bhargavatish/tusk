//Grabbing the id of the login form
const form = document.querySelector('#login');

//Grabbing the id of the area where status is displayed
const feed = document.querySelector('#feed');

////Adding an eventListener
form.addEventListener('submit', userLogin);
document.addEventListener('DOMContentLoaded', () => {
    feed.textContent = 'Welcome BACK ! ! !'
    
})

//Callback function against the eventListener userLogin
async function userLogin(e) {
    try {
        e.preventDefault();
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        const userObj = {
            name: username,
            pw: password
        } 

        //Adding new expense into the expense table
        console.log('Before userlogin post request')
        await axios.post('http://localhost:2203/login/userlogin', userObj).then((response) => {
            alert(response.data.token)

            //To set the token into the localStorage
            console.log(response.data.token)
            sessionStorage.setItem('token',response.data.token)
            localStorage.setItem('token',response.data.token);

            //Directing to the expense page
            window.location.href="./Expense.html"

        })
        
    } catch (error) {
        console.log(error.message)
        feed.textContent = error.message.toUpperCase()
    }


}