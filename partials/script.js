const balance = document.getElementById('bal');
const incAmt = document.getElementById('inc-amount');
const expAmt = document.getElementById('exp-amount');
const form = document.getElementById('form');
const description = document.getElementById('desc');
const inputAmount = document.getElementById('inp-amt');
const trans = document.getElementById('trans');

/* let dummyData = [
    { id: 1, description: "salary", amount: 35000 },
    { id: 2, description: "Dress", amount: -1000 },
    { id: 3, description: "Grocery", amount: -2000 },
    { id: 4, description: "petrol", amount: -500 },
    { id: 5, description: "eb bill", amount: -700 }
]

let transactions = dummyData; */

//Local sroage access
const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTrans : [];

//Load All transactions
function loadAllTransaction(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? "trans-exp" : "trans-inc");
    item.innerHTML = `${transaction.description}
    <span class="trans-Amount">${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del"  onclick="deleteTrans(${transaction.id})">X</button>`;
    trans.appendChild(item);
}

///remove deleted transactions
function deleteTrans(id) {
    if (confirm("Are you sure yo want to delete transaction?")) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        configurations();
        updateLocalStorage();
    }
    else {
        return;
    }

}

//update Amout
function updateAmount() {
    const amounts = transactions.map(transaction => transaction.amount);
    const totalBal = amounts.reduce((a, b) => (a + b), 0).toFixed(2);
    balance.innerHTML = `&#x20B9 ${totalBal}`;

    const income = amounts.filter(amt => amt > 0).reduce((a, b) => (a + b), 0).toFixed(2)
    incAmt.innerHTML = `&#x20B9 ${income}`;

    const expense = amounts.filter(amt => amt < 0).reduce((a, b) => (a + b), 0).toFixed(2)
    expAmt.innerHTML = `&#x20B9 ${Math.abs(expense)}`;

}

function configurations() {
    trans.innerHTML = "";
    transactions.forEach(loadAllTransaction);
    updateAmount();
}

window.addEventListener('load', function () {
    configurations();
})

//add new transaction
function addTransaction(e) {
    e.preventDefault();
    if (description.value.trim() == "" || inputAmount.value.trim() == "") {
        alert("Enter proper details");
    }
    else {
        const newTrans = {
            id: Math.floor(Math.random() * 100000),
            description: description.value,
            amount: Number(inputAmount.value)
        }
        transactions.push(newTrans);
        loadAllTransaction(newTrans);
        description.value = "";
        inputAmount.value = "";
        updateAmount();
        updateLocalStorage();
    }
}
form.addEventListener('submit', addTransaction);

//update local storage

function updateLocalStorage() {
    localStorage.setItem('trans', JSON.stringify(transactions));
}
