
//Grabbing the main form through it's id
const Add = document.getElementById('main-form')
const Leaderboard = document.getElementById('leaderboard-list');
const DownloadFiles = document.getElementById('downloaded-files');
const SeeFiles = document.getElementById('seefiles')
const pagination = document.getElementById('pagination')
var ul = document.querySelector('#main-list');//of the expenses

//Adding an eventListener
Add.addEventListener("submit", addExpense);

//Callback function against the eventListener
async function addExpense(e) {
    e.preventDefault();
    try {

        //This is the expense object to be sent
        const myExpense = {
            amount: document.querySelector('#exp').value,
            category: document.querySelector('#caty').value,
            description: document.querySelector('#desc').value
        };

        // Getting the token from localStorage
        const token = localStorage.getItem('token')

        //To make an entry of new expense on the expense table
        const response = await axios.post('http://localhost:2203/expense/postExpense', myExpense, { headers: { "Authorization": token } });

        //To a new expense on the screen
        createList(myExpense);

    } catch (error) {
        console.log(error)
    }
}

document.getElementById('buy-premium').onclick = async (e) => {
    e.preventDefault();

    console.log("Entered purchase")
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:2203/purchase/premiumMembership', { headers: { 'Authorization': token } })

    var options = {
        "key": response.data.key_id, //Enter the id generated from the dashboard of razorpay
        "order_id": response.data.order.id, // For one time payment

        // This handler function will handle the success 
        "handler": async function (response) {
            await axios.post('http://localhost:2203/purchase/updateTransactionStatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                success: true
            }, { headers: { 'Authorization': token } })
            alert('You are a premium user now !')
            const btnParent = document.getElementById('buy-premium').parentElement
            const btnChild = btnParent.children[1]
            btnParent.removeChild(btnChild)
            document.getElementById('is-Premium').textContent = 'Hello, PREMIUM USER !!!'
        }
    }

    const rzp1 = new Razorpay(options)
    rzp1.open()

    rzp1.on('payment.failed', async function (response) {
        console.log('Failed executed')
        await axios.post(`http://localhost:2203/purchase/updateTransactionStatus`, {
            order_id: options.order_id,
            success: false
        }, {
            headers: { 'Authorization': token }
        })
        alert('Something went wrong')
    })

}
//Function to display new expense on the user screen
function createList(expense) {

    // Creating the new expense to be added
    // var ul = document.querySelector('#main-list');
    // console.log('hey atish ul is here',ul)

    var li = document.createElement('li');
    li.className = 'list-group-item';
    // console.log('Expense', expense)
    // console.log('Amount', expense.amount)

    var liText = document.createTextNode(`Amount : ${expense.amount}, Category : ${expense.category}, Description : ${expense.description}`);
    // console.log(liText);

    li.appendChild(liText);
    ul.appendChild(li);

    //To set the fields of the form empty
    document.querySelector('#exp').value = '';
    document.querySelector('#caty').value = '';
    document.querySelector('#desc').value = '';

    //To create a delete button against the new expense
    var delBtn = document.createElement('button');
    delBtn.appendChild(document.createTextNode('Delete Expense'));
    delBtn.classList = 'btn btn-sm btn-warning float-right text-white delete mr-2';

    //To create a edit button against the new expense
    var edit = document.createElement('button');
    edit.appendChild(document.createTextNode('Edit Expense'));
    edit.classList = 'btn btn-dark text-white float-right btn-sm Edit mr-2';

    // To add delete and edit button against the new expense
    li.appendChild(delBtn);
    li.appendChild(edit);

    //Delete function for the delete button added recently
    delBtn.onclick = async function (e) {
        e.preventDefault();
        try {
            var id = expense.id;
            //Deleting from the expense table
            if (id) {
                const token = localStorage.getItem('token')
                const response = axios.delete(`http://localhost:2203/expense/delete-expense/${id}`, { headers: { "Authorization": token } })
            }
            //Removing from the screen
            var del = e.target.parentElement;
            ul.removeChild(del);
        } catch (error) {
            console.log(error)
        }

    }

    //Edit function for the edit button added recently
    edit.onclick = function (e) {
        e.preventDefault();
        try {
            //Editing in the expense table
            var id = expense.id;
            if (id) {
                const token = localStorage.getItem('token')
                const response = axios.delete(`http://localhost:2203/expense/delete-expense/${id}`, { headers: { "Authorization": token } })
            }
            //Removing old entry from the screen
            var onEdit = e.target.parentElement;
            ul.removeChild(onEdit);

            //Restore fields with the current entry
            document.querySelector('#exp').value = expense.amount;
            document.querySelector('#caty').value = expense.category;
            document.querySelector('#desc').value = expense.description;

        } catch (error) {
            console.log(error)
        }
    }
}


//showLeaderboard
function showLeaderboard(user) {

    const li = document.createElement('li');
    const liText = `Name : ${user.names},TotalExpense : ${user.total_expense > 0 ? user.total_expense : 0} `
    const liTextNode = document.createTextNode(liText)

    li.appendChild(liTextNode)
    Leaderboard.appendChild(li)

}

// To show downloaded files
function showDownloadedFiles(user) {
    try {
        const li = document.createElement('li');
        const btn = document.createElement('button'); btn.onclick = `${user.Urls}`
        const a = document.createElement('a')

        const liText = `id :${user.id}, DateOfDownload : ${user.DownloadDate},UserNo. : ${user.userId} `
        const liTextNode = document.createTextNode(liText)
        const at = document.createTextNode('download')

        a.setAttribute('href', `${user.Urls}`)
        a.appendChild(at); btn.appendChild(a);

        li.appendChild(liTextNode); li.appendChild(btn)
        DownloadFiles.appendChild(li)
    } catch (error) {
        console.log('error on showDownloadFiles : ', error)
    }


}
function removeList() {

    if (ul.children.length > 0) {
        console.log(ul.children.length)

        for (var i = 0; i < ul.children.length; i++) {
            console.log(i, " : ", ul.children[i])
            // ul.remove(ul.children[i])
            // ul.removeChild(ul.children[i])
        }
    }
}
//To display the entries form the table against the userId on loading the page
document.addEventListener('DOMContentLoaded', async (e) => {

    try {
        e.preventDefault();
        // console.log(ul)

        //Pagination
        // const ObjUrlParams = new URLSearchParams(window.location.search)
        // const page = ObjUrlParams.get('page') || 1 ;
        const page = 1;
        // console.log('page is', pagination)

        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:2203/expense/getExpense?page=${page}`, { headers: { 'Authentication': token } })
        // console.log('responseis :', response.data.response)
        // console.log('responseis :', response.data)

        const myObj = {}
        if (response.data.response.length < 1) {
            console.log('No data to display')
        }

        else {
            for (var i = 0; i < response.data.response.length; i++) {
                createList(response.data.response[i])
                // showPagination(response.data.pageData)
                myObj[i] = response.data.response[i];
            }
            showPagination(response.data)
        }
        function showPagination({ currentPage, hasNextPage, hasPreviousPage, lastPage, nextPage, previousPage }) {
            // console.log('current page is , ',currentPage)
            // console.log('current page is , ',hasNextPage)
            // console.log('current page is , ',hasPreviousPage)
            // console.log('current page is , ',lastPage)
            // console.log('current page is , ',nextPage)
            // console.log('current page is , ',previousPage)
            pagination.innerHTML = '';
            if (hasPreviousPage) {
                const btn2 = document.createElement('button')
                btn2.innerHTML = previousPage;
                btn2.addEventListener('click', () => {
                    removeList()
                    getExpense(previousPage)
                })
                pagination.appendChild(btn2)
            }
            const btn1 = document.createElement('button')
            btn1.innerHTML = `<h3>${currentPage}</h3>`
            btn1.addEventListener('click', () => {
                removeList()
                getExpense(currentPage)
            })
            pagination.appendChild(btn1)
            if (hasNextPage) {
                const btn3 = document.createElement('button')
                btn3.innerHTML = nextPage;
                btn3.addEventListener('click', () => {
                    removeList()
                    getExpense(nextPage)
                })
                pagination.appendChild(btn3)
            }
        }

        async function getExpense(page) {
            // if (ul.children.length > 0) {
            //     console.log(ul.children.length)
        
            //     for (var i = 0; i < ul.children.length; i++) {
            //         console.log(i, " : ", ul.children[i])
            //         // ul.remove(ul.children[i])
            //         // ul.removeChild(ul.children[i])
            //     }
            // }
            const response = await axios.get(`http://localhost:2203/expense/getExpense?page=${page}`, { headers: { 'Authentication': token } })
            // console.log('response get expense', response)
            // console.log('firstChild',page,ul.children[0])
            // console.log(ul.children.length)
            for (var i = 0; i < response.data.response.length; i++) {
                createList(response.data.response[i])
                // showPagination(response.data)
                // showPagination(response.data.pageData)
                // myObj[i] = response.data.response[i];
            }
            showPagination(response.data)
            // showPagination(response.data.response)
        }




        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //To check if logged in user is a premium member or not
        const premiumMember = await axios.get('http://localhost:2203/check/isPremiumMember', { headers: { 'Authentication': token } })
        // console.log('premiumMember', premiumMember)
        if (premiumMember.data.code == 'yes') {

            // console.log('Premium Member logged in');

            const btnParent = document.getElementById('buy-premium').parentElement;
            const btnChild = btnParent.children[1];
            btnParent.removeChild(btnChild)

            const messageArea = document.getElementById('is-Premium')
            messageArea.textContent = 'WELCOME back ! PREMIUM MEMBER'

            const leaderboard = document.createElement('input'); leaderboard.type = 'button'
            leaderboard.value = 'Show Leaderboard'; leaderboard.id = 'Leaderboard'; leaderboard.classList = 'btn btn-sm btn-ml btn-mr text-white bg-success';
            document.getElementById('is-Premium').appendChild(leaderboard)

            // creating a pdf button to see the generated report
            const pdfBtn = document.createElement('button');
            pdfBtn.id = 'pdf'; pdfBtn.classList = 'btn btn-sm btn-ml bg-dark';

            var anchor = document.createElement("a");
            var anchorText = document.createTextNode("PDF");

            anchor.setAttribute("href", `http://localhost:5500/Frontend/Report.html`);
            anchor.target = '_blank'

            anchor.appendChild(anchorText);
            pdfBtn.appendChild(anchor);

            document.getElementById('is-Premium').appendChild(pdfBtn)


            SeeFiles.onclick = async (e) => {
                try {
                    e.preventDefault()
                    const SeeFilesResponse = await axios.get('http://localhost:2203/expense/urltable', { headers: { 'Authorization': token } })

                    for (let i = 0; i < SeeFilesResponse.data.getUrlResponse.length; i++) {
                        showDownloadedFiles(SeeFilesResponse.data.getUrlResponse[i])
                    }

                } catch (error) {
                    console.log('SeeFilesResponse btn error is : ', error)
                }
            }


            leaderboard.onclick = async (e) => {
                try {

                    e.preventDefault()
                    const users = await axios.get('http://localhost:2203/leaderboard/getUsers', { headers: { 'Authorization': token } })

                    //To remove overlapping if clicked twice
                    while (Leaderboard.children.length) {
                        i = 0; Leaderboard.removeChild(Leaderboard.children[i]); i++
                    }

                    //calling function to show leaderboard with the details fetched from backend
                    for (let i = 0; i < users.data.result.length; i++) {
                        showLeaderboard(users.data.result[i])  //scroll up to see the function
                    }

                } catch (error) {
                    console.log('Leaderboard button show error : ', error);
                }
            }
        }

    } catch (error) {
        console.log(error)
    }
})

