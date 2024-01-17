
const carBought=new Promise((resolve) =>{
    setTimeout(() =>{
        resolve('bought a car');
    },1000);
})

const planTrip =new  Promise((resolve) =>{
    setTimeout(() =>{
        resolve('Planned the trip');
    },0)
})

const reachManali =new Promise((resolve) =>{
    setTimeout(() =>{
        resolve('reached Manali');
    },0)
})

 const Trip = async () =>{

    let [car,plan,reach] = await Promise.all([carBought,planTrip,reachManali]);
    console.log(car);
    console.log(plan);
    console.log(reach);
}
Trip();