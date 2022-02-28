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
    return fetchApi(url);
  } else {
    const url = "https://openapi.programming-hero.com/api/phones";
    return fetchApi(url);
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
    <button
      class="mt-3 hover:bg-indigo-500 bg-indigo-400 px-5 py-2 rounded text-white font-bold"
    >
      Details
    </button>
  </div>`;
      mainDiv.appendChild(div);
    });
  }
};

ApiUrl(null, null);

// ======= Catch Api on Search =======
getElem("search-btn")[0].addEventListener("click", () => {
  const field = getElem("search-field");
  if (field[2] === "") {
    alert("Please Add Your Input Before Click The Button");
    // else if(){

    // }
  } else {
    getElem("result-section")[0].textContent = "";
    ApiUrl(field[2], null);
  }
});
