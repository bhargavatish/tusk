const h1 = document.getElementById('main-heading');
//The main problem is that when I load the page it saves without the click from the user
//If current api is removed from DOMContentLoaded, and put into something else then, we won't get a download btn with url
//If we put a btn on domcontentloaded, and onclick replace this with a different btn still it would require to be clicked
//      in the next btn we would attach the url and write as getFile

const DownloadBtn = document.getElementById('download')
const tbody = document.getElementById('tbody')

DownloadBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    const token= localStorage.getItem('token')
    const saveFile = document.createElement('button');  saveFile.id='save-file'
    saveFile.classList = 'btn btn-sm align-right text-white bg-dark'
    var downloadResponse = await axios.get('http://localhost:2203/expense/download', { headers: { 'Authorization': token } })
    //api to save the downloaded link 'link' in the table. Make another controller altogether
    var link = downloadResponse.data.fileDownloaded
    console.log('The link is : ', link)

    const a = document.createElement('a')
    var t = document.createTextNode('Save_File')
    a.setAttribute('href', link)
    a.appendChild(t);
    saveFile.appendChild(a)
    document.getElementById('head-content').removeChild(document.getElementById('download'))
    alert('File downloaded !')
    h1.appendChild(saveFile)
})




    //api call to get all expenses and store them in a global variable. Later use it to append all tr in tbody
    //save all the downloaded links
    //check backend of  seeDownloads btns
document.addEventListener('DOMContentLoaded',async (e) => {
    // alert('welcome')
    var token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:2203/expense/getExpense', { headers: { 'Authentication': token } })
    // console.log('responseis :',response.data.response[0])
    // const data2 = response.data.response[1];
    for(let i=0;i<response.data.response.length;i++){
        const data = response.data.response[i];
        const tr = document.createElement('tr')
        const th1 = document.createElement('th')
        const th2 = document.createElement('th')
        const th3 = document.createElement('th')
        const th4 = document.createElement('th')
        th1.scope='col'; th1.innerHTML=data.createdAt;
        th2.scope='col'; th2.innerHTML=data.amount;
        th3.scope='col'; th3.innerHTML=data.category;
        th4.scope='col'; th4.innerHTML=data.description;
        tr.appendChild(th1);tr.appendChild(th2);
        tr.appendChild(th3);tr.appendChild(th4);
        tbody.appendChild(tr)
    }
    // const tr = document.createElement('tr')
    // const th1 = document.createElement('th')
    // const th2 = document.createElement('th')
    // const th3 = document.createElement('th')
    // const th4 = document.createElement('th')
    // console.log(tbody)
    // th1.scope='col'; th1.innerHTML=data.createdAt;
    // th2.scope='col'; th2.innerHTML=data.amount;
    // th3.scope='col'; th3.innerHTML=data.category;
    // th4.scope='col'; th4.innerHTML=data.description;
    // tr.appendChild(th1);tr.appendChild(th2);
    // tr.appendChild(th3);tr.appendChild(th4);
    // tbody.appendChild(tr)

    // const tr2 = document.createElement('tr')
    // const th5 = document.createElement('th')
    // const th6 = document.createElement('th')
    // const th7 = document.createElement('th')
    // const th8 = document.createElement('th')
    // th5.scope='col'; th5.innerHTML=data2.createdAt;
    // th6.scope='col'; th6.innerHTML=data2.amount;
    // th7.scope='col'; th7.innerHTML=data2.category;
    // th8.scope='col'; th8.innerHTML=data2.description;
    // tr2.appendChild(th5);tr2.appendChild(th6);
    // tr2.appendChild(th7);tr2.appendChild(th8);
    // tbody.appendChild(tr2)

})






// console.log(document.URL)
// const queryString = window.location.search
// console.log('queryString ',queryString)

// for(let i=0;i<queryString[0].length; i++){
//     console.log(queryString[i])
// }
// const urlParams = new URLSearchParams(queryString)
// console.log('urlParams ',urlParams.response)

// const file = urlParams.get('file')
// console.log('The file is : ',file[0])


