const balance = document.getElementById("balance");
const money_plus = document.getElementById( "money-plus" );
const money_minus = document.getElementById("money-minus" );
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions =  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add transaction
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
}
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('please add text and amount')
    }else{
      const transaction = {
        id:generateID(),
        text:text.value,
        amount:+amount.value
      }
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value='';
      amount.value='';
    }
  }

function generateID(){
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
    ${transaction.text} <span>${sign}&#8377;${Math.abs(transaction.amount)}</span> <button class="delete-btn"onclick =
     "removeTransaction(${transaction.id})">x</button>
  `;
    list.appendChild(item);
}  

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

function updateValues(){
    const amount = transactions.map((transactions) => transactions.amount);
    const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amount.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.innerText=`\u20B9 ${total}`;
    money_plus.innerText = `\u20B9 ${income}`;
    money_minus.innerText = `\u20B9 ${expense}`;
    
}
//Init app
function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
};  
init(); 
form.addEventListener('submit', addTransaction);                        