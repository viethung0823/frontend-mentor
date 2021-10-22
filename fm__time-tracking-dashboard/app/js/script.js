const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const timeframe = $$(".user__timeframe>p")
const main = $("main");

async function getData() {
  try {
    const res = await fetch("../app/js/data.json")
    const data = await res.json();
    renderData(data);
    updateClick(data)
  } catch (e) {
    console.log(e)
  }
}

// render Today for default
function renderData(data) {
  data.forEach((catalog) => {
    const catalogElm = document.createElement("div");
    catalogElm.classList.add("catalog", `${catalog.title.replace(/\s/g, '')}`);
    catalogElm.innerHTML = `
    <div class="catalog__top">
      <img src="../images/icon-${catalog.title.toLowerCase().replace(/\s/g, '')}.svg" alt="" class="catalog__icon">
    </div>
    <div class="catalog__bottom">
      <div class="catalog__title">
        <p>${catalog.title}</p>
      </div>
    <div class="catalog__time">
      <p class="catalog__time--current">${catalog.timeframes.daily.current}hrs</p>
      <p class="catalog__time--previous">Yesterday - ${catalog.timeframes.daily.previous}hrs</p>
    </div>
  </div>
  <div class="catalog__dots">
      <span></span>
      <span></span>
      <span></span>
  </div>
    `
    main.appendChild(catalogElm);
  });
}

function updateData(arrCurrent, arrPrevious, previousText) {
  const currentElms = $$(".catalog__time--current");
  const previousElms = $$(".catalog__time--previous");
  for(let i = 0; i< 6; i++) {
    currentElms[i].innerText = `${arrCurrent[i]}hrs`;
    previousElms[i].innerText = `${previousText} - ${arrPrevious[i]}hrs`;
  }
}

function updateClick(data) {
  timeframe.forEach(elm => {
    elm.addEventListener("click", () => {
      const option = elm.innerHTML.toLowerCase();
      const previousText = (option === "daily") ? "Yesterday" : (option === "weekly") ? "Last week" : "Last month";
      const arrCurrent = [];
      const arrPrevious = [];
      timeframe.forEach(frame => {
        frame.classList.remove("user__timeframe--active");
      });
      elm.classList.add("user__timeframe--active");
      data.forEach(catalog => {
        arrCurrent.push(catalog.timeframes[option].current);
        arrPrevious.push(catalog.timeframes[option].previous);
      }); 
      updateData(arrCurrent, arrPrevious, previousText);
    })
  });
}

getData();