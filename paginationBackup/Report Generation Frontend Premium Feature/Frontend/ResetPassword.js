
const reset = document.getElementById('forgot-pw');
console.log('reset form grabbed', reset);

const resetBtn = document.getElementById('resetBtn')
console.log('reset button grabbed', resetBtn);

reset.addEventListener('submit', resetPassword)

async function resetPassword (e) {
    e.preventDefault()

    const mailObj = { email: reset.email.value }
    
    const token = localStorage.getItem('token')

    reset.email.value=''
    
    const response = await axios.post('http://localhost:2203/called/password/forgotpassword/',mailObj,{headers:{'Authorization':token}})
     console.log('Response is : ,', response)

}