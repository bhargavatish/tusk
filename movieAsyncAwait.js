     
    console.log('person1: person with ticket');
    console.log('person2: person with ticket');
    
    const preMovie = async () =>{
    
    const wifeTickets = new Promise((resolve,reject) =>{
        setTimeout(() => {
            
            resolve('ticket');
            console.log('Person3 received ticket');
            },3000)
    })
    const getPopcorn = new Promise((resolve) => resolve('popcorn'));
    const getButter = new Promise((resolve) => resolve('butter'));
    const coldDrink = new Promise((resolve) => resolve('Cold-Drink'));
    
    let [ticket,popcorn,butter,drink] = await Promise.all([wifeTickets,getPopcorn,getButter,coldDrink]);

    console.log(`Got ${ticket} \nGot ${popcorn} \nGot ${butter} \nGot ${drink} \n`)    

    }
    preMovie()
        
    console.log('person4: person with ticket');
    console.log('person5: person with ticket');
    