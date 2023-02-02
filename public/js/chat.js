const socket=io()

// socket.on('countUpdated', (count)=>{
//     console.log('the count has been updated ',count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increment')
// })

socket.on('message',(message)=>{
    console.log(message)
    const html=Mustache.render(messageTemplate, {
        username:message,username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
})

const $messageform=document.querySelector('#message-form')

const $messageFormInput=$messageform.querySelector('input')

const $messageFormButton=$messageform.querySelector('button')

const $messageSendLocationButton=document.querySelector('#send-location')

const messages=document.querySelector('#messages')

const messageTemplate=document.querySelector('#message-template').innerHTML

const locationmessageTemplate=document.querySelector('#location-message-template').innerHTML

const sidebarTemplate=document.querySelector('#sidebar-template').innerHTML

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})



const autoScroll = () =>{
    const $newMessage=messages.offsetHeight

    const containerHeight=messages.scrollHeight

    const scrollOffSet=messages.scrollTop + visibleHeight

    if(containerHeight - newMessageHeight <= scrollOffSet)
    {
        messages.scrollTop = messages.scrollHeight
    }
}


socket.on('locationMessage',(message)=>{
    console.log(message)

    const html=Mustache.render(locationmessageTemplate , {
        username:message,username,
        url:message.url,
        createdAt:moment(message.createdAt).format('h:mm a')

    })
    messages.insertAdjacentHTML('beforeend', html)

})


socket.on('roomData' , ({room,users})=>{
    // console.log(room)
    // console.log(users)
    const html=Mustache.render(sidebarTemplate, {
        room,
        users
    })

    document.querySelector('#sidebar').innerHTML=html
})


$messageform.addEventListener('submit',(e)=>{
    e.preventDefault()

    $messageFormButton.setAttribute('disabled','disabled')

    const message=e.target.elements.message.value

    socket.emit('sendMessage',message, (error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value=''
        $messageFormInput.focus()
        // console.log('msg has been delivered', message)

        if(error){
            return console.log(error)
        }

        console.log('Message delivered')
    })

})

$messageSendLocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }

    $messageSendLocationButton.setAttribute('disabled','disabled')


    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        socket.emit('sendLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }, ()=>{
            $messageSendLocationButton.removeAttribute('disabled')

            console.log('Location shared')
        })
    })
})

socket.emit('join', {username,room} , (error)=>{
    if(error)
    {
        alert(error)
        location.href='/'
    }

})