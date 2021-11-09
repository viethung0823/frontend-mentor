const $ = document.querySelector.bind(document);

const shareBtnElm = $(".post__btnShare");
const shareMenuElm = $(".post__btnShare-menu");
shareBtnElm.addEventListener("click", () => {
  shareMenuElm.classList.toggle("hide");
});
