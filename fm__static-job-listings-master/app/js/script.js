const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

async function getData() {
  const res = await fetch('app/js/data.json');
  const data = await res.json();
  useData(data);
}

function useData(jobs) {
  const mainElm = $("main");
  const filterBoxElm = $(".filter-box");
  const filtersElm = $(".filters");
  let currentFilters = [];

  jobs.forEach((job, index) => {
    const jobElm = document.createElement('div');
    jobElm.classList.add("job");
    jobElm.setAttribute('id', `job-${job.id}`)
    const jobLogo = job.logo;
    const jobCompany = job.company;
    const jobPosition = job.position;
    const jobPostedAt = job.postedAt;
    const jobContract = job.contract;
    const jobLocation = job.location;
    const jobFilters = [...job.languages, ...job.tools];
    jobElm.innerHTML = `
    <img src="${jobLogo}" alt="logo" class="job__logo">
    <div class="job__tag">
      <p class="job__tag--name">${jobCompany}</p>
    </div>
    <h3 class="job__position">${jobPosition}</h3>
    <div class="job__detail">
      <div>${jobPostedAt}</div>
      <div>${jobContract}</div>
      <div>${jobLocation}</div>
      </div>
    <div class="job__separate"></div>
    <div class="job__filter"></div>
      `;
    mainElm.appendChild(jobElm);

    // check New tag
    if (job.new) {
      const newTagElm = document.createElement('span');
      newTagElm.textContent = 'New!';
      newTagElm.classList.add("job__tag--new");
      jobElm.childNodes[3].appendChild(newTagElm);
    }

    // check Featured tag
    if (job.featured) {
      const featuredTagElm = document.createElement('span');
      featuredTagElm.textContent = 'Featured!';
      featuredTagElm.classList.add("job__tag--featured");
      jobElm.childNodes[3].appendChild(featuredTagElm);
    }

    jobFilters.map(jobFilter => {
      const divElm = document.createElement('div');
      divElm.textContent = jobFilter;
      jobElm.childNodes[11].appendChild(divElm);

      divElm.addEventListener("click", () => {
        // check isExitFilter
        const isExitFilter = currentFilters.some(elm => {
          return elm === jobFilter;
        })
        if (!isExitFilter) {
          currentFilters.push(jobFilter)
        }
        // display filterBox
        filterBoxElm.style.display = 'flex';
        filtersElm.innerHTML = ``;
        // render filter tag inside filterBox
        currentFilters.map(elm => {
          const filterElm = document.createElement('div');
          const filterNameElm = document.createElement('div');
          const filterTimesElm = document.createElement('div');

          filterElm.classList.add('filter');
          filterNameElm.classList.add('filter__name');
          filterTimesElm.classList.add('filter__times');

          filterNameElm.textContent = elm;
          filterElm.append(filterNameElm, filterTimesElm);
          filtersElm.appendChild(filterElm);

          filterTimesElm.addEventListener("click", () => {
            const removeIndex = currentFilters.indexOf(elm);
            currentFilters.splice(removeIndex, 1);
            filterElm.remove();
            filter(currentFilters);
          })
        })
        // 
        filter(currentFilters);
      })
    })
  });

  const clearAllBtn = function () {
    const clearElm = $('.clear');
    clearElm.addEventListener("click", () => {
      if (filtersElm.innerHTML === ``) {
        filterBoxElm.style.display = 'none';
      } else {
        filtersElm.innerHTML = ``;
        currentFilters = [];
        filter(currentFilters);
      }
    });
  }();

  function filter(allFilter) {
    jobs.forEach((job) => {
      const jobElm = $(`#job-${job.id}`);
      const jobFilters = [...job.languages, ...job.tools];
      const isFound = allFilter.every(eachFilter => {
        return jobFilters.includes(eachFilter);
      })
      if (!isFound) {
        jobElm.style.display = 'none';
      } else {
        jobElm.style.display = 'grid';
      }
    })
  }
}

getData();