// ========= Get Html Element =======
const getElem = (idClass) => {
  const elem = document.getElementById(idClass);
  const elemText = elem.innerText;
  const elemValue = elem.value;
  return [elem, elemText, elemValue];
};

// ========== API URL =======
const ApiUrl = (isSearch, isId) => {
  if (isSearch !== null) {
    const url = `https://openapi.programming-hero.com/api/phones?search=${isSearch}`;
    return fetchApi(url);
  } else if (isId !== null) {
    const url = `https://openapi.programming-hero.com/api/phone/${isId}`;
    return fetchMoreDetails(url);
  }
};

// ========= Fetch API ======
const fetchApi = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => catchApi(data.data, data.status));
};

// ========= Catch API on Home ========
const catchApi = (data, status) => {
  const mainDiv = getElem("result-section")[0];
  if (status === false) {
    alert("Sorry No Result Found");
    getElem("404")[0].style.display = "block";
  } else {
    data.map((info) => {
      const div = document.createElement("div");
      div.classList.add = `sm:mx-4 mx-2 shadow sha bg-white sm:p-5 p-2 rounded`;
      div.innerHTML = `<div class="sm:mx-4 mx-2 shadow sha bg-white sm:p-5 p-2 rounded">
    <img
      src="${info.imagee}"
      alt="${info.phone_name}"
    />

    <h2 class="font-bold text-2xl sm:text-3xl">${info.phone_name}</h2>
    <h3 class="text-1xl sm:text-2xl text-gray-500">${info.brand} Brand</h3>
    <button onclick="moreDetailsUrl('${info.slug}')"
      class="mt-3 hover:bg-indigo-500 bg-indigo-400 px-5 py-2 rounded text-white font-bold" 
      type="button"
      data-modal-toggle="defaultModal"
    >
      Details
    </button>
  </div>`;
      mainDiv.appendChild(div);
    });
  }
};

// ApiUrl(null, null);

// ======= Catch Api on Search =======
getElem("search-btn")[0].addEventListener("click", () => {
  const field = getElem("search-field");
  if (field[2] === "") {
    alert("Please Add Your Input Before Click The Button");
    field[0].focus();
  } else {
    getElem("search-field")[0].value = "";
    getElem("result-section")[0].textContent = "";
    getElem("404")[0].style.display = "none";
    ApiUrl(field[2], null);
  }
});

// ====== Fetch More Data =======
const fetchMoreDetails = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => moreDetails(data.data));
};

// ====== More Details Url =====
const moreDetailsUrl = (slug) => {
  ApiUrl(null, slug);
};

// ======= Catch More Data ========
const moreDetails = (data) => {
  const body = document.querySelector("#more-details");
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("toggle-more");
  body.appendChild(modalDiv);

  modalDiv.innerHTML = ` <div
  style="position: absolute; transition: 0.9s; top: -1000%; z-index: 2"
  id="details-section"
  class="sm:mx-5 mx-3 bg-white p-2 rounded"
>
  <div class="flex justify-center">
    <img width="320px" src="./404.png" alt="" />
  </div>
  <div class="info text-center">
    <h1 class="text-2xl font-bold">${data.name}</h1>
    <p class="font-bold">${data?.releaseDate ?? "Not Avail"}</p>
    <p class="font-bold">Brand: ${data.brand}</p>
  </div>

  <!-- =========details=========== -->
  <div class="mt-3 shadow rounded bg-sky-300 p-5 md:mx-64 lg:mx-96">
    <div class="flex justify-left bg-slate-100 rounded my-3 py-3 px-2">
      <p class="font-semibold mr-3">Storage:</p>
      <p>${data?.mainFeatures?.storage ?? "Not Avail"}</p>
    </div>
    <div class="flex justify-left bg-slate-100 rounded my-3 py-3 px-2">
      <p class="font-semibold mr-3">Display:</p>
      <p>${data.mainFeatures?.displaySize ?? "Not Avail"}</p>
    </div>
    <div class="flex justify-left bg-slate-100 rounded my-3 py-3 px-2">
      <p class="font-semibold mr-3">Chip:</p>
      <p>${data.mainFeatures?.chipSet ?? "Not Avail"}</p>
    </div>
    <div class="flex justify-left bg-slate-100 rounded my-3 py-3 px-2">
      <p class="font-semibold mr-3">Memory:</p>
      <p>${data.mainFeatures?.memory ?? "Not Avail"}</p>
    </div>
  </div>

  <!-- ========Sensor + Other ========= -->
  <div id="sensor-other" class="grid gap-3 grid-cols-1 sm:grid-cols-2">
  <ul id="sensors" class="shadow py-2 my-5">
  <h2 class="text-center text-2xl font-bold">Sensors</h2>
  </ul>
    <!-- ============Other========== -->
    <div id="other-section" class="shadow py-2 my-5">
      <h2 class="text-center text-2xl font-bold">Other Information</h2>
      
    </div>
  </div>
  <div class="grid lg:mx-96">
    <button onclick="closeBtn()"
      id="close-btn"
      class="mb-5 rounded font-bold text-1xl bg-red-500 hover:bg-red-600 py-2 px-4 text-white"
    >
      Close
    </button>
  </div>
</div>`;

  // ======= Sensor Map Loop =========
  data.mainFeatures.sensors.map((li) => {
    const sensorLi = document.createElement("li");
    sensorLi.classList.add(
      "bg-slate-100",
      "mx-1",
      "sm:mx-2",
      "font-semibold",
      "rounded",
      "my-3",
      "py-3",
      "px-2",
      "capitalize"
    );
    sensorLi.innerText = li;
    getElem("sensors")[0].appendChild(sensorLi);
  });
  getElem("details-section")[0].style.top = "185px";

  // ======== Other Map Loop =========
  Object.entries(data?.others).map((keyValue) => {
    const othersDiv = document.createElement("div");
    othersDiv.classList.add(
      "flex",
      "mx-2",
      "justify-left",
      "bg-slate-100",
      "rounded",
      "my-3",
      "py-3",
      "px-2"
    );
    othersDiv.innerHTML = `<p class="font-semibold mr-3">${keyValue[0]}:</p>
        <p>${keyValue[1]}</p>`;
    document.getElementById("other-section").appendChild(othersDiv);
  });
};

// ========= Close More Handler ======
const closeBtn = () => {
  getElem("details-section")[0].style.top = "-1000%";
  getElem("more-details")[0].textContent = "";
};
