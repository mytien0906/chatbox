const socket = io();
const chatMessage = document.querySelector("#chat_messages");
const form = document.querySelector('.chat-box-footer');
const input = document.querySelector('#chat_input');

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(input.value){
        socket.emit("message",input.value);
        input.value = "";
    }
})
socket.on("messages",(msg)=>{

    msg.forEach(value => {
        createMessage(value);
    });
})
socket.on("message",(msg)=>{
    createMessage(msg);
})

const createMessage = (msg) => {
  const item = document.createElement("div");
  item.classList.add("message");
  item.classList.add("my-message");
  item.textContent = msg;

  chatMessage.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
};