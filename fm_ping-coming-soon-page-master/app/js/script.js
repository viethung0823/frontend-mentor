const $ = document.querySelector.bind(document);

const btnEm = $(".btn");
const inputElm = $(".input");
const inValidMessage = $(".invalid");

btnEm.addEventListener("click", () => {
  if (!inputElm.checkValidity()) {
    inValidMessage.style.display = "block";
  }
});

inputElm.addEventListener("input", () => {
  inValidMessage.style.display = "none";
});
