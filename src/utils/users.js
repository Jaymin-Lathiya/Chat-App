const users=[]

const addUser=({id,username,room}) =>{
    username=username.trim().toLowerCase()

    room=room.trim().toLowerCase()


    if(!username || !room)
    {
        return{
            error:"Username and room are required !"
        }
    }

    const existingUser=users.find((user) =>{

        return user.room === room && user.username===username 
    })

    if(existingUser)
    {
        return{
            error:'Username is in use'
        }
    }


    const user={id,username,room}
    users.push(user)
    return {user}
}


const removeUser=(id) =>{
    const index=users.findIndex((user) =>user.id === id)

    if(index !== -1)
    {
        return users.splice(index, 1)[0]
    }
}


const getUser= (id) =>{
    return users.find((user) =>user.id === id)
}

const getUsersInRoom=(room) =>{
    room=room.trim().toLowerCase()
    return users.filter((user) =>user.room==room)
}


// addUser({
//     id:22,
//     username:'First',
//     room:'nodejs'
// })

// addUser({
//     id:23,
//     username:'second',
//     room:'nodejs'
// })

// addUser({
//     id:24,
//     username:'third',
//     room:'nodejs'
// })
// addUser({
//     id:25,
//     username:'five',
//     room:'nodejs'
// })



// console.log(users)


// const res=addUser({
//     id:33,
//     username:"first",
//     room:'nodejs '
// })

// console.log(res)


// const user=getUser(25)
// console.log(user)


// const userList=getUsersInRoom('nodejs')
// console.log(userList)
// const removedUser=removeUser(33)
// console.log(removeUser)

module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}