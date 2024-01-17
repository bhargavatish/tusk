const posts=[
    {title:'post one', body:'This is post one'},
    {title:'post two', body:'This is post two'}
];

const  updateLastActivityTime = () =>{
        return new Promise((resolve) =>{
            setTimeout(() =>{
                const Utime =new Date().getHours() +':'+ new Date().getMinutes()+':'+new Date().getSeconds();
                resolve(Utime);
            },1000)
        })
} 
const createPost = (post) =>{
    return new Promise((resolve) =>{
        posts.push(post);
        const time=updateLastActivityTime();
        resolve(time);
    })
}
const deletePost = () =>{
    return new Promise((resolve) =>{
        posts.pop();
        console.log('The remaining posts are : ')
        posts.forEach( (post) => console.log(post.title,'_',post.body))
        resolve(updateLastActivityTime());
    })
}
Promise.all([createPost({title:'post three',body:'this is third post'}) ])
                .then((values) => console.log( 'Last updated : ',values))
                .then(deletePost)
                .catch((err) => console.log(err));

posts.forEach((post) =>{console.log(post.title,'_',post.body)});

// constcreatePost({title:'post three',body:'this is third post'})
// console.log( Utime);
// posts.forEach((post) =>{console.log(post.body)});
// console.log(deletePost());