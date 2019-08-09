import messages from "../../Models/message.js"
import {authUser} from "../../Models/user.js"
import newChatController from "../../Controllers/chatController.js"
import {subscribe} from '../../Models/message.js';

let lastMessage;

const chatScreen = `
<div class="h-100">
    <div class="d-flex flex-column h-100">
        <div class="header bg-primary text-white"><h1>Name</h1></div>
        <div class="flex-grow-1" id="js-chatArea"></div>
        <div class="p-3">
            <form id="js-formChat">                             
                <div class="d-flex flex-row w-100">
                    <div class="flex-grow-1">
                        <input type="text" class="form-control" id="chatMsg" placeholder="Type your message ..." >
                    </div>
                    <div>
                        <button type="submit" class="btn btn-outline-primary" >Send</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
`;

function addMessage(message) {
    const msgDiv = document.createElement('div');
    const msgSpan = document.createElement('span');
    msgSpan.innerHTML = message.content;
    if (lastMessage && lastMessage.uid !== message.uid) {
        msgDiv.setAttribute('class', 'mt-4');
    } else {
        msgDiv.setAttribute('class', 'mt-1');

    }
    if (message.uid === authUser.id) {
        msgDiv.classList.add('text-right');
        msgSpan.setAttribute('class' ,'badge badge-primary');
    } else {
        msgSpan.setAttribute('class', 'badge badge-secondary');
    }
    msgDiv.appendChild(msgSpan);
    document.getElementById('js-chatArea').appendChild(msgDiv);
    lastMessage = message;    
}


function onload() {
    subscribe(chat);

    for (let i = 0; i< messages.length; i++) {
        addMessage(messages[i])
    }

    const formChat = document.getElementById('js-formChat');
    formChat.addEventListener('submit', function() {
        event.preventDefault();
        const message = formChat.chatMsg.value;
        const controller = newChatController();
        controller.sendMessage(message);
        formChat.reset() 
    })
}

function onNotifyMessage(message) {
    addMessage(message);
}

const chat = {
    content: chatScreen,
    onload: onload,
    onNotifyMessage: onNotifyMessage
};

export default chat;