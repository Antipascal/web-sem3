const api_endpoint = 'https://my-json-server.typicode.com/Antipascal/web-sem3-data/users'

const usersStorageKey = 'users'
const form = document.forms.addUser;
const table = document.querySelector('.users__table');
const tableBody = table.querySelector('.table__body');
const loader = document.createElement('div');

form.addEventListener('submit', addUser);
function addUser(event) {
    event.preventDefault();
    if (tableBody) {
        const user = {
            id: Math.floor(Math.random() * 100 + 10),
            name: form.elements.name.value,
            nickname: form.elements.nickname.value,
            escalation_phone:  form.elements.escalation_phone.value,
            permission:  form.elements.permission.value,
        };
        addRowToTable(user)
        saveDataToLocalstorage(user)
    }
}

loader.classList.add('spinner');
table.append(loader);
const users = fetch(api_endpoint)
    .then((response) => response.json())
    .then((data) => {
        const indexes = Math.floor(Math.random() * 5) + 10;
        restoreDataFromLocalStorage(data)
        if (!(table && tableBody)) {
            return
        }
        table.removeChild(loader);
        data
            .filter((user) => user.id > indexes)
            .forEach((user) => { addRowToTable(user) });
    })
    .catch((e) => {
        table.innerHTML = `<div class="error">Error dutring fetch ${e}</div>`;
    });

function addRowToTable(user) {
    const row = `
      <tr class="table__row">
        <td class="table__cell table__data">${user.name}</td>
        <td class="table__cell table__data">${user.nickname}</td>
        <td class="table__cell table__data">${user.escalation_phone}</td>
        <td class="table__cell table__data">${user.permission}</td>
      </tr>
  `;
    tableBody.insertAdjacentHTML("beforeend", row);
}

function saveDataToLocalstorage(user) {
    const localStorageData = JSON.parse(localStorage.getItem(usersStorageKey)) || {};
    localStorageData[user.nickname] = user;
    localStorage.setItem(usersStorageKey, JSON.stringify(localStorageData));
}

function restoreDataFromLocalStorage(data) {
    const savedUsers = JSON.parse(localStorage.getItem(usersStorageKey)) || {}
    Object.keys(savedUsers).forEach((key) => {
        data.push(savedUsers[key]);
    });
}
