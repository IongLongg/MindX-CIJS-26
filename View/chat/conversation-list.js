import newChatController from '../../Controllers/chatController.js';
import {subscribe} from '../../Models/conversation.js';
import {currentConversation} from '../../Models/message.js';

const listScreen = `
<div class="row p-3">
    <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#modal-create-conversation" >+</button>
</div>

<div id="js-listConversation"></div>


<hr>

<div id="modal-create-conversation" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create a new conversation</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="js-formCreateConversation">
            <div class="form-group">
                <label for="#">Name: </label>
                <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name of group...">
            </div>  
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" id="js-btnCreateConversation" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`;

function onload() {
    subscribe(conversationList)

    const btnCreate = document.getElementById('js-btnCreateConversation')
    const formCreate = document.getElementById('js-formCreateConversation')
    btnCreate.addEventListener('click', function() {
        const chatController = newChatController()
        chatController.createConversation(formCreate.name.value)
    })
}

function onNotifyConversation(conversation) {
  const listConversation = document.getElementById('js-listConversation')
  const bgClass = conversation.id === currentConversation.id ? 'bg-secondary' : ''
  
  const newConversation = 
  `
    <div class="d-flex ${bgClass}" id="${conversation.id}">
        <div class="pr-3">
        <img
            style="width: 100px"
            class="rounded-circle "
            src="https://motsandco.com/wp-content/uploads/avatar-2-300x300.png"
            alt=""
        />
        </div>
        <div class="flex-grow-1">
            <h2>${conversation.name}</h2>
        </div>
    </div>
  `
  listConversation.insertAdjacentHTML("beforeend", newConversation)

  document.getElementById(conversation.id).addEventListener("click", function () {
    const chatController = newChatController()
    if (currentConversation)
      document.getElementById(currentConversation).classList.remove('bg-secondary')
    chatController.changeConversation(conversation.id)
    this.classList.add('bg-secondary')
  })
  
}


const conversationList = {
  content: listScreen,
  onload: onload,
  onNotifyConversation: onNotifyConversation
};

export default conversationList