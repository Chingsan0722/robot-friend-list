const dataPanel = document.querySelector("#data-panel");
const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const friendsArr = [];

axios
  .get(INDEX_URL)
  .then((response) => {
    friendsArr.push(...response.data.results);
    renderFriendList(friendsArr);
  })
  .catch((error) => {
    console.log("error");
  });

function renderFriendList(data) {
  let rawHTML = ``;
  data.forEach((item) => {
    rawHTML += `
      <div class="card m-2" data-bs-toggle="modal" data-bs-target="#user-modal">
        <img class="card-img-top" src="${item.avatar}" alt="Card image cap" data-modal-user-id="${item.id}">
        <div class="card-body" data-modal-user-id="${item.id}">
          <h5 class="card-title mb-0" data-modal-user-id="${item.id}">${item.name} ${item.surname}</h5>
        </div>
      </div>
    `;
  });
  dataPanel.innerHTML = rawHTML;
}
document.querySelector(".modal-title").innerText = "";
document.querySelector("#modal-image").innerHTML = "";
document.querySelector(".modal-person-info").innerHTML = "";

dataPanel.addEventListener("click", function renderModal(e) {
  if (e.target.matches(".card")) {
    document.querySelector(".modal-title").innerText = "";
    document.querySelector("#modal-image").innerHTML = "";
    document.querySelector(".modal-person-info").innerHTML = "";
    axios
      .get(INDEX_URL + `${e.target.dataset.id}`)
      .then((response) => {
        document.querySelector(
          ".modal-title"
        ).innerText = `${response.data.name}`;
        document.querySelector(
          "#modal-image"
        ).innerHTML = `<img src="${response.data.avatar}" class="card-img-top" alt="...">`;
        document.querySelector(".modal-person-info").innerHTML = `
    <ul>
                <li class="modal-surmane">
                  Surname: ${response.data.surname}
                </li>
                <li class="modal-gender">
                  Gender: ${response.data.gender}
                </li>
                <li class="modal-birth">
                  Birthdat: ${response.data.birthday}
                </li>
                <li class="modal-age">
                  Age: ${response.data.age}
                </li>
                <li class="modal-region">
                  Region: ${response.data.region}
                </li>
                <li class="modal-email">
                  E-mail: ${response.data.email}
                </li>
              </ul>`;
        console.log(response);
      })
      .catch((error) => {
        console.log("error");
      });
  }
});
