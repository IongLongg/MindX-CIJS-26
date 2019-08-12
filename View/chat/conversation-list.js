import newChatController from '../../Controllers/chatController.js';

const listScreen = `
<div class="row p-3">
    <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#modal-create-conversation" >+</button>
</div>
<div class="d-flex">
    <div class="pr-3">
    <img
        style="width: 100px"
        class="rounded-circle "
        src="https://motsandco.com/wp-content/uploads/avatar-2-300x300.png"
        alt=""
    />
    </div>
    <div class="flex-grow-1">
        <h2>Group chat</h2>
        <span>Hello</span>
    </div>
</div>
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
    const btnCreate = document.getElementById('js-btnCreateConversation')
    const formCreate = document.getElementById('js-formCreateConversation')
    const modalCreate = document.getElementById('modal-create-conversation')
    btnCreate.addEventListener('click', function() {
        const chatController = newChatController()
        chatController.createConversation(formCreate.name.value)
        console.log(formCreate.name.value)
    })
}

export default {
  content: listScreen,
  onload: onload
};
