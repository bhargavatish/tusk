// Posts problem using async/await,promiseAll


const posts=[
    {title:'post one', body:'This is post one'},
    {title:'post two', body:'This is post two'}
];
const logPost =() =>{
     posts.map((post) =>{console.log(post.title,'_',post.body)});
}

const  updateLastActivityTime = () =>{
    return new Promise((resolve) =>{
        setTimeout(() =>{
            const Utime =new Date().getHours() +':'+ new Date().getMinutes()+':'+new Date().getSeconds();
            resolve(Utime);
        },1000)
    })
} 

const createPost = (post) =>{
    posts.push(post);
    return new Promise((resolve) =>{
        const time= updateLastActivityTime();
        resolve(time);
    })
}

const deletePost = () =>{
    return new Promise((resolve) =>{
        let poppedElement= posts.pop();
        let str=`Deleted Post is : ${poppedElement.title} _ ${poppedElement.body}`;
        resolve(str);
    })
}

const POST = async() =>{

let [second,third] = await Promise.all([createPost({title:'post three', body:'This is third post'}),deletePost()]);

console.log('\n')
logPost()
console.log(`\nPost created at : ${second}`);
console.log('\n',third);
console.log('\nRemaining posts are :-')
logPost();
console.log('\n')
}

POST();

