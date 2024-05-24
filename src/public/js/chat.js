const socket = io();
let user

Swal.fire({
    title : 'Bienvenido al chat',
    input : 'text',
    text : 'Ingrese su nombre',
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    inputValidar: (value)=>{
        return !value && 'Debe ingresar un nombre'
    }
}).then((result) => {
    user = result.value;
    socket.emit('authenticate', user);
    
});


const mensajes = document.getElementById('mensaje');

mensajes.addEventListener('keyup', (event) => {
    if (event.key === 'Enter'){
        if (mensajes.value.trim().length > 0){
            socket.emit("message",{user:user, message:mensajes.value} )
            mensajes.value = "";
        }
    }
});


socket.on('newUser', (data) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `El usuario ${data} se ha conectado`,
        showConfirmButton: false,
        timer: 3000
    });
});

socket.on('message', (data) => {
    let messageList = document.getElementById('message-list');
    let messages = messageList.innerHTML;
    messages = messages + `${data.user}: ${data.message} </br>`;
    messageList.innerHTML = messages;
});

socket.on('messageLog', (data) => {
    let messageList = document.getElementById('message-list');
    data.forEach(message => {
        let messages = messageList.innerHTML;
        messages = messages + `${message.user}: ${message.message} </br>`;
        messageList.innerHTML = messages;
    });
});