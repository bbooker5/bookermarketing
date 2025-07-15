
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
let names = [];

function addName() {
    const name = nameInput.value.trim();
    if (name !== '') {
        names.push(name);
        nameInput.value = '';
        renderNames();
    }
}

function renderNames() {
    nameList.innerHTML = '';
    names.forEach((name) => {
        const li = document.createElement('li');
        li.textContent = name;
        nameList.appendChild(li);
    });
}

function randomizeNames() {
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }
    renderNumberedNames();
}

function renderNumberedNames() {
    nameList.innerHTML = '';
    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${name}`;
        nameList.appendChild(li);
    });
}

nameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addName();
    }
});

// Toggle strike-through on list item click
document.getElementById('nameList').addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === 'LI') {
        event.target.classList.toggle('struck');
    }
});

function resetList() {
    names = [];
    document.getElementById('nameList').innerHTML = '';
}
