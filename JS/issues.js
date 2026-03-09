let allIssues = [];
function loadingAllCards() {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;
      displayAllCards(data.data);
    });
}
function loadCard(id) {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModalCard(data.data));
}
function loadSearchCard(inputValue) {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (inputValue.length === 0) {
        loadingAllCards();
      } else {
        displaySearchCards(data.data);
      }
    });
}
const displayAllCards = (id) => {
  const cardSection = document.getElementById("cardSection");

  // Adding card to the section
  id.forEach((element) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div  class="card h-full border-t-3 ${element.status === "open" ? `border-green-500` : `border-purple-600`}  bg-base-100 shadow-sm py-4 space-y-4">
            <!-- status & Priority -->
            <div class="flex justify-between px-4">
              <div>
                ${element.status === "open" ? `<img src="./assets/Open-Status.png" alt="Open-Status" />` : `<img src="./assets/Closed- Status .png" alt="Closed-Status" />`}
              </div>
              ${
                element.priority === "high"
                  ? `<button class="button px-8 bg-red-300 text-red-500 rounded-3xl">HIGH</button>`
                  : element.priority === "medium"
                    ? `<button class="button px-8 bg-orange-200 text-yellow-700 rounded-3xl">MEDIUM</button>`
                    : `<button class="button px-8 bg-gray-200 text-gray-500  rounded-3xl">LOW</button>`
              }
            </div>
            <!-- intro info -->
            <div class="px-4 space-y-1">
              <h1 class="text-[#000000] font-semibold text-xl">
                ${element.title}
              </h1>
              <p class="text-[#64748B] text-[1rem] text-justify">
                ${element.description}
              </p>
            </div>
            <!-- levels -->
            <div class="px-4 flex flex-wrap gap-2 justify-between">
            ${setLabel(element.labels)}
            
            
            </div>
            <hr class="text-gray-300 w-100% col-span-2" />
            <!-- author name -->
            <div class="px-4 space-y-2 flex flex-col">
              <span class="text-[#64748B] text-sm">#1 by ${element.author}</span>
              <span class="text-[#64748B] text-sm">${new Date(element.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                },
              )}</span>
            </div>
      </div>
  `;
    cardSection.appendChild(card);

    // Add modals to each card
    card.addEventListener("click", function () {
      loadCard(element.id);
    });
  });
  allCount(allIssues);
};

const displayModalCard = (id) => {
  const modal = document.getElementById("modal-info");
  modal.innerHTML = `
       <div>
                <h1 class="text-[#000000] font-semibold text-2xl mb-2">${id.title}</h1>
                <!-- Modal Author info -->
                <div class="flex flex-wrap md:flex-nowrap gap-2 items-center">
                ${
                  id.status === "open"
                    ? `<button
                    class="button border-none text-[.9rem] outline-none px-3 bg-green-200 text-green-500 uppercase rounded-3xl"
                  >
                    Opened
                  </button>`
                    : `<button
                    class="button border-none text-[.9rem] outline-none px-3 bg-purple-200 text-purple-500 uppercase rounded-3xl"
                  >
                    Closed
                  </button>`
                }
                  
                  <span class="bg-gray-400 w-1 h-1 rounded-full inline-block"></span>
                  <p class="text-[#64748B] text-[1rem]">Opened by <span>${id.author}</span></p>
                  <span class="bg-gray-400 w-1 h-1 rounded-full inline-block"></span>
                  <p class="text-[#64748B] text-[1rem]">${new Date(id.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}</p>
                </div>
              </div>
              <!-- labels -->
              <div class=" flex flex-wrap gap-3 ">
            ${setLabel(id.labels)}
            
            
            </div>
              <!-- description -->
              <div>
                <p class="text-[#64748B] text-[1rem]">
                  ${id.description}
                </p>
              </div>
              <!-- assign and priority -->
              <div class="flex">
                <div class="flex-1 flex-col gap-2">
                  <p class="text-[#64748B] font-medium text-[1rem]">Assign:</p>
                  <h1 class="text-[#000000] font-medium text-[1rem]">${id.assignee.length === 0 ? `No One Assignee` : id.assignee}</h1>
                </div>
                <div class="flex-1 flex-col gap-2">
                  <p class="text-[#64748B] font-medium text-[1rem]">Priority:</p>
                  ${
                    id.priority === "high"
                      ? `<button class="button px-8 bg-red-300 text-red-500 rounded-3xl">HIGH</button>`
                      : id.priority === "medium"
                        ? `<button class="button px-8 bg-orange-200 text-yellow-700 rounded-3xl">MEDIUM</button>`
                        : `<button class="button px-8 bg-gray-200 text-gray-500  rounded-3xl">LOW</button>`
                  }
                </div>
              </div>
  `;
  document.getElementById("modal_card").showModal();
};
// set labels
function setLabel(arr) {
  const labels = arr.map((label) => {
    if (label === "bug") {
      return `<button class="button text-[.8rem] px-2 bg-red-300 text-red-600 rounded-3xl">
                <i class="fa-solid fa-bug"></i> BUG
        </button>`;
    } else if (label === `help wanted`) {
      return ` <button class="button text-[.8rem] px-3 bg-orange-200 text-orange-400 rounded-3xl">
                <i class="fa-regular fa-life-ring"></i> HELP WANTED
              </button>`;
    } else if (label === `enhancement`) {
      return ` <button class="button text-[.8rem] px-3 bg-green-200 text-green-500 uppercase rounded-3xl">
                <i class="fa-solid fa-bolt-lightning"></i> Enhancement
              </button>`;
    } else if (label === `good first issue`) {
      return ` <button class="button text-[.8rem] px-3 bg-red-100 text-red-400 uppercase rounded-3xl">
                 <i class="fa-solid fa-circle-exclamation"></i> good first issue
              </button>`;
    } else if (label === `documentation`) {
      return ` <button class="button text-[.8rem] px-3 bg-orange-100 text-orange-400 uppercase rounded-3xl">
                 <i class="fa-solid fa-video"></i> documentation
              </button>`;
    }
  });
  return labels.join("");
}
loadingAllCards();

// Counting Section
const count = document.getElementById("defaultCount");
const allCount = (arr) => {
  count.innerText = arr.length;
};

const openCountFun = (arr) => {
  const openCardArr = arr.filter((element) => element.status === "open");
  count.innerText = openCardArr.length;
};
const closeCountFun = (arr) => {
  const closeCardArr = arr.filter((element) => element.status === "closed");
  count.innerText = closeCardArr.length;
};

// Card Section
const cardSection = document.getElementById("cardSection");

// Tabs Section
const displayOpenCard = (arr) => {
  const openCardArr = arr.filter((element) => element.status === "open");
  // Adding card to the section
  openCardArr.forEach((element) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div  class="card h-full border-t-3 ${element.status === "open" ? `border-green-500` : `border-purple-600`}  bg-base-100 shadow-sm py-4 space-y-4">
            <!-- status & Priority -->
            <div class="flex justify-between px-4">
              <div>
                ${element.status === "open" ? `<img src="./assets/Open-Status.png" alt="Open-Status" />` : `<img src="./assets/Closed- Status .png" alt="Closed-Status" />`}
              </div>
              ${
                element.priority === "high"
                  ? `<button class="button px-8 bg-red-300 text-red-500 rounded-3xl">HIGH</button>`
                  : element.priority === "medium"
                    ? `<button class="button px-8 bg-orange-200 text-yellow-700 rounded-3xl">MEDIUM</button>`
                    : `<button class="button px-8 bg-gray-200 text-gray-500  rounded-3xl">LOW</button>`
              }
            </div>
            <!-- intro info -->
            <div class="px-4 space-y-1">
              <h1 class="text-[#000000] font-semibold text-xl">
                ${element.title}
              </h1>
              <p class="text-[#64748B] text-[1rem] text-justify">
                ${element.description}
              </p>
            </div>
            <!-- levels -->
            <div class="px-4 flex flex-wrap gap-2 justify-between">
            ${setLabel(element.labels)}
            
            
            </div>
            <hr class="text-gray-300 w-100% col-span-2" />
            <!-- author name -->
            <div class="px-4 space-y-2 flex flex-col">
              <span class="text-[#64748B] text-sm">#1 by ${element.author}</span>
              <span class="text-[#64748B] text-sm">${new Date(element.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                },
              )}</span>
            </div>
      </div>
  `;
    cardSection.appendChild(card);

    // Add modals to each card
    card.addEventListener("click", function () {
      loadCard(element.id);
    });
  });
};
const displayClosedCard = (arr) => {
  const openCardArr = arr.filter((element) => element.status === "closed");
  // Adding card to the section
  openCardArr.forEach((element) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div  class="card h-full border-t-3 ${element.status === "open" ? `border-green-500` : `border-purple-600`}  bg-base-100 shadow-sm py-4 space-y-4">
            <!-- status & Priority -->
            <div class="flex justify-between px-4">
              <div>
                ${element.status === "open" ? `<img src="./assets/Open-Status.png" alt="Open-Status" />` : `<img src="./assets/Closed- Status .png" alt="Closed-Status" />`}
              </div>
              ${
                element.priority === "high"
                  ? `<button class="button px-8 bg-red-300 text-red-500 rounded-3xl">HIGH</button>`
                  : element.priority === "medium"
                    ? `<button class="button px-8 bg-orange-200 text-yellow-700 rounded-3xl">MEDIUM</button>`
                    : `<button class="button px-8 bg-gray-200 text-gray-500  rounded-3xl">LOW</button>`
              }
            </div>
            <!-- intro info -->
            <div class="px-4 space-y-1">
              <h1 class="text-[#000000] font-semibold text-xl">
                ${element.title}
              </h1>
              <p class="text-[#64748B] text-[1rem] text-justify">
                ${element.description}
              </p>
            </div>
            <!-- levels -->
            <div class="px-4 flex flex-wrap gap-2 justify-between">
            ${setLabel(element.labels)}
            
            
            </div>
            <hr class="text-gray-300 w-100% col-span-2" />
            <!-- author name -->
            <div class="px-4 space-y-2 flex flex-col">
              <span class="text-[#64748B] text-sm">#1 by ${element.author}</span>
              <span class="text-[#64748B] text-sm">${new Date(element.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                },
              )}</span>
            </div>
      </div>
  `;
    cardSection.appendChild(card);

    // Add modals to each card
    card.addEventListener("click", function () {
      loadCard(element.id);
    });
  });
};
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

// Active button
function activeSectionBtn(id) {
  allBtn.classList.remove("bg-primary", "text-white");
  openBtn.classList.remove("bg-primary", "text-white");
  closedBtn.classList.remove("bg-primary", "text-white");

  allBtn.classList.add("bg-base-300");
  openBtn.classList.add("bg-base-300");
  closedBtn.classList.add("bg-base-300");

  const active = id;
  active.classList.add("bg-primary", "text-white");
}
allBtn.addEventListener("click", function () {
  activeSectionBtn(allBtn);
  allCount(allIssues);
});
openBtn.addEventListener("click", function () {
  cardSection.innerHTML = "";
  displayOpenCard(allIssues);
  openCountFun(allIssues);
  activeSectionBtn(openBtn);
});
closedBtn.addEventListener("click", function () {
  cardSection.innerHTML = "";
  displayClosedCard(allIssues);
  closeCountFun(allIssues);
  activeSectionBtn(closedBtn);
});

// Search Card
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", function () {
  const searchInputValue = searchInput.value;
  console.log(searchInputValue);
  loadSearchCard(searchInputValue);
});
const displaySearchCards = (arr) => {
  const searchInputValue = searchInput.value;
  console.log(arr);
  cardSection.innerHTML = "";
  if (searchInputValue.length === 0) {
    loadingAllCards();
  } else {
    arr.forEach((element) => {
      console.log(element);
      const card = document.createElement("div");
      card.innerHTML = `
        <div  class="card h-full border-t-3 ${element.status === "open" ? `border-green-500` : `border-purple-600`}  bg-base-100 shadow-sm py-4 space-y-4">
              <!-- status & Priority -->
              <div class="flex justify-between px-4">
                <div>
                  ${element.status === "open" ? `<img src="./assets/Open-Status.png" alt="Open-Status" />` : `<img src="./assets/Closed- Status .png" alt="Closed-Status" />`}
                </div>
                ${
                  element.priority === "high"
                    ? `<button class="button px-8 bg-red-300 text-red-500 rounded-3xl">HIGH</button>`
                    : element.priority === "medium"
                      ? `<button class="button px-8 bg-orange-200 text-yellow-700 rounded-3xl">MEDIUM</button>`
                      : `<button class="button px-8 bg-gray-200 text-gray-500  rounded-3xl">LOW</button>`
                }
              </div>
              <!-- intro info -->
              <div class="px-4 space-y-1">
                <h1 class="text-[#000000] font-semibold text-xl">
                  ${element.title}
                </h1>
                <p class="text-[#64748B] text-[1rem] text-justify">
                  ${element.description}
                </p>
              </div>
              <!-- levels -->
              <div class="px-4 flex flex-wrap gap-2 justify-between">
              ${setLabel(element.labels)}

              </div>
              <hr class="text-gray-300 w-100% col-span-2" />
              <!-- author name -->
              <div class="px-4 space-y-2 flex flex-col">
                <span class="text-[#64748B] text-sm">#1 by ${element.author}</span>
                <span class="text-[#64748B] text-sm">${new Date(
                  element.createdAt,
                ).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}</span>
              </div>
        </div>
    `;
      cardSection.appendChild(card);

      // Add modals to each card
      card.addEventListener("click", function () {
        loadCard(element.id);
      });
    });
    count.innerText = arr.length;
  }
};
