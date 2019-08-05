const messages = [
    {
        uid: "namlong9012@gmail.com",
        content: "Di hoc mindX k?"

    },
    {
        uid: "mindx@gmail.com",
        content: "Ok b"

    },
    {
        uid: "namlong9012@gmail.com",
        content: "Di hoc mindX k?"

    },
    {
        uid: "mindx@gmail.com",
        content: "Ok b"

    }
];

function addMessage(message) {
    messages.push(message);
    notifyMessage(message);
    saveMessage(message);
};

const listSubscriber = [];

function subscribe(screen) {
    listSubscriber.push(screen);
};

function unsubscribe(screen) {
    //TODO: homework
};

function notifyMessage(message) {

    for (let i = 0; i < listSubscriber.length; i++) {
        listSubscriber[i].onNotifyMessage(message);
    }
};

function saveMessage(message) {
    db.collection("conversations").doc("GZipxA9eWg2PnoRQD0lm").update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    })
    .then(function () {
            console.log("Document successfully written!");
        })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });
};

export { addMessage };
export { subscribe };
export { unsubscribe };
export default messages;