// Data
let transactions = [];

// DOM elements
const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const transactionList = document.getElementById('transaction-list');
const balanceElement = document.getElementById('balance');

// Event listeners
incomeForm.addEventListener('submit', addIncome);
expenseForm.addEventListener('submit', addExpense);




function addIncome(e) {
    e.preventDefault();
    const description = document.getElementById('income-description').value;
    const amount = parseFloat(document.getElementById('income-amount').value);
    
    if (description !== '' && amount > 0) {
        const income = {
            type: 'income',
            description,
            amount
        };
        
        transactions.push(income);
        updateUI();
        clearInputFields(incomeForm);
    }
}

function addExpense(e) {
    e.preventDefault();
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    
    if (description !== '' && amount > 0) {
        const expense = {
            type: 'expense',
            description,
            amount
        };
        
        transactions.push(expense);
        updateUI();
        clearInputFields(expenseForm);
    }
}
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}
function editTransaction(index) {
    const transaction = transactions[index];
    
    // Prompt the user for new values
    const newDescription = prompt('Enter the new description:', transaction.description);
    const newAmount = parseFloat(prompt('Enter the new amount:', transaction.amount));
    
    if (newDescription !== null && newAmount >= 0) {
        // Update the transaction
        transaction.description = newDescription;
        transaction.amount = newAmount;
        
        updateUI();
    }
}


function updateUI() {
    transactionList.innerHTML = '';
    let balance = 0;
    
    transactions.forEach((transaction, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${transaction.description} - $${transaction.amount.toFixed(2)}`;
        
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => editTransaction(index));
        
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteTransaction(index));
        
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        transactionList.appendChild(listItem);
        
        if (transaction.type === 'income') {
            balance += transaction.amount;
        } else if (transaction.type === 'expense') {
            balance -= transaction.amount;
        }
    });
    
    
    balanceElement.innerText = balance.toFixed(2);
    
}



function clearInputFields(form) {
    form.reset();
}

