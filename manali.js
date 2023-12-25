
const carBought=new Promise((resolve) =>{
    setTimeout(() =>{
        resolve('bought a car');
    },1000);
})

const planTrip =new  Promise((resolve) =>{
    setTimeout(() =>{
        resolve('Planned the trip');
    })
})

const reachManali =new Promise((resolve) =>{
    setTimeout(() =>{
        resolve('reached Manali');
    })
})

 const Trip = async () =>{

    let [car,plan,reach] = await Promise.all([carBought,planTrip,reachManali]);
    console.log(car);
    console.log(plan);
    console.log(reach);
}
Trip();