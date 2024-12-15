
const passportApplication=new Promise((resolve) =>{
    setTimeout(() =>{
        resolve('Applied for passport');
    },1000);
})

const passportReceived=new Promise((resolve) =>{
    setTimeout(() =>{
        resolve('Passport received');
    },0);
})

const visaEurope =new  Promise((resolve) =>{
    setTimeout(() =>{
        resolve('Applied for visa of Europe');
    },0)
})

const visaReceived =new Promise((resolve) =>{
    setTimeout(() =>{
        resolve('Received the visa. Now , it is the time to buy the tickets.');
    },0)
})

 const Trip = async () =>{

    let [ppAppl,ppRece,visaAppl,visaRece] = await Promise.all([passportApplication,passportReceived,visaEurope,visaReceived]);
    console.log(ppAppl);
    console.log(ppRece);
    console.log(visaAppl);
    console.log(visaRece);
}
Trip();