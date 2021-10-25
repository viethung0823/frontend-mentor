const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputElm = $("input");

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

inputElm.addEventListener("keydown", (e) => {
  const lastMessageElm = $("#last-message");
  if (e.keyCode === 13) {
    e.preventDefault();
    if (inputElm.value != "") {
      const sendNewMessageElm = document.createElement("p");
      sendNewMessageElm.classList.add("message", "message--sent", "message--sent--text");
      sendNewMessageElm.innerText = inputElm.value;
      insertAfter(sendNewMessageElm, lastMessageElm);
      sendNewMessageElm.scrollIntoView();
      lastMessageElm.removeAttribute('id');
      sendNewMessageElm.id = "last-message";
      inputElm.value = "";
    }
  }

})