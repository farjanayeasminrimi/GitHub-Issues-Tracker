function loadingAllCards() {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllCards(data.data));
}
const displayAllCards = (id) => {
  const cardSection = document.getElementById("cardSection");

  // assignee: "jane_smith";
  // author: "john_doe";
  // createdAt: "2024-01-15T10:30:00Z";
  // description: "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.";
  // id: 1;
  // labels: (2)[("bug", "help wanted")];
  // priority: "high";
  // status: "open";
  // title: "Fix navigation menu on mobile devices";
  // updatedAt: "2024-01-15T10:30:00Z";

  id.forEach((element) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="card h-full border-t-3 border-green-500 bg-base-100 shadow-sm py-4 space-y-4">
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
              <p class="text-[#64748B] text-[1rem]">
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
  });
};
// set labels
function setLabel(arr) {
  const labels = arr.map((label) => {
    if (label === "bug") {
      return `<button class="button px-2 bg-red-300 text-red-600 rounded-3xl">
                <i class="fa-solid fa-bug"></i> BUG
        </button>`;
    } else if (label === `help wanted`) {
      return ` <button class="button px-3 bg-orange-200 text-orange-400 rounded-3xl">
                <i class="fa-regular fa-life-ring"></i> HELP WANTED
              </button>`;
    } else if (label === `enhancement`) {
      return ` <button class="button px-3 bg-green-200 text-green-500 uppercase rounded-3xl">
                <i class="fa-solid fa-bolt-lightning"></i> Enhancement
              </button>`;
    } else if (label === `good first issue`) {
      return ` <button class="button px-3 bg-red-100 text-red-400 uppercase rounded-3xl">
                 <i class="fa-solid fa-circle-exclamation"></i> good first issue
              </button>`;
    } else if (label === `documentation`) {
      return ` <button class="button px-3 bg-orange-100 text-orange-400 uppercase rounded-3xl">
                 <i class="fa-solid fa-video"></i> documentation
              </button>`;
    }
  });
  return labels.join("");
}
loadingAllCards();
