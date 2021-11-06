const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

async function getData() {
  const res = await fetch("/app/js/data.json");
  const data = await res.json();
  handleEvent(data);
}

getData();

function handleEvent(pages) {
  const changePlanet = (function () {
    const planetElms = $$(".destination__list__item");
    const planetImgElm = $(".destination__planet");
    const planetNameElm = $(".destination__planet-name");
    const planetDesElm = $(".destination__planet-des");
    const planetDisElm = $(".destination__planetDetail__item.distance>span");
    const planetTravelElm = $(".destination__planetDetail__item.travel>span");

    planetElms.forEach((element) => {
      element.addEventListener("click", () => {
        const planet = element.textContent;
        const index = planet === "Moon" ? 0 : planet === "Mars" ? 1 : planet === "Europa" ? 2 : 3;
        planetElms.forEach((element) => {
          element.classList.remove("active");
        });
        element.classList.add("active");
        updatePlanet(index);
      });
    });

    function updatePlanet(index) {
      planetImgElm.src = pages.destinations[index].images.png;
      planetNameElm.textContent = pages.destinations[index].name;
      planetDesElm.textContent = pages.destinations[index].description;
      planetDisElm.textContent = pages.destinations[index].distance;
      planetTravelElm.textContent = pages.destinations[index].travel;
    }
  })();

  const clickSliderPlanet = (function () {
    const sliderElms = $$(".crew__slider>span");
    const crewRoleElm = $(".crew__role");
    const crewNameElm = $(".crew__name");
    const crewBioElm = $(".crew__bio");
    const crewImgElm = $(".crew__img");

    sliderElms.forEach((element) => {
      element.addEventListener("click", () => {
        const index = element.getAttribute("id").slice(5);
        sliderElms.forEach((element) => {
          element.classList.remove("active");
        });
        element.classList.add("active");
        updateSlide(index);
      });
    });

    function updateSlide(index) {
      crewRoleElm.textContent = pages.crew[index].role;
      crewNameElm.textContent = pages.crew[index].name;
      crewBioElm.textContent = pages.crew[index].bio;
      crewImgElm.src = pages.crew[index].images.png;
    }
  })();

  const clickSliderTech = (function () {
    const sliderElms = $$(".technology__slider>span");
    const techHeadingElm = $(".technology__heading>span");
    const techDesElm = $(".technology__des");
    const techImgElm = $(".technology__img");

    sliderElms.forEach((element) => {
      element.addEventListener("click", () => {
        const index = element.getAttribute("id").slice(4);
        sliderElms.forEach((element) => {
          element.classList.remove("active");
        });
        element.classList.add("active");
        updateSlide(index);
      });
    });

    function updateSlide(index) {
      techHeadingElm.textContent = pages.technology[index].name;
      techDesElm.textContent = pages.technology[index].description;
      document.documentElement.style.setProperty("--techImg-portrait", `url(../${pages.technology[index].images.portrait})`);
      document.documentElement.style.setProperty("--techImg-landscape", `url(../${pages.technology[index].images.landscape})`);
    }
  })();

  const toggleMobileNav = (function () {
    const mobileToggleElm = $(".header__mobile-toggle>img");
    const navElm = $(".header__nav");
    mobileToggleElm.addEventListener("click", () => {
      navElm.classList.toggle("hide-m");
      if (mobileToggleElm.classList.contains("hamburger")) {
        mobileToggleElm.classList.remove("hamburger");
        mobileToggleElm.src = "assets/shared/icon-hamburger.svg";
      } else {
        mobileToggleElm.classList.add("hamburger");
        mobileToggleElm.src = "assets/shared/icon-close.svg";
      }
    });
  })();
}
