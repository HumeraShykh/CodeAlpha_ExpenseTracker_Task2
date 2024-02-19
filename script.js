const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const total = document.getElementById("total");

let expenses = [];

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("expense-description").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);

  if (!isNaN(amount)) {
    const expense = { id: Date.now(), description, amount };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    expenseForm.reset();
  }
});

function displayExpenses() {
  expenseList.innerHTML = "";
  let totalAmount = 0;
  expenses.forEach((expense) => {
    totalAmount += expense.amount;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${expense.description}</td>
      <td>$${expense.amount}</td>
      <td><button onclick="deleteExpense(${expense.id})">Delete</button></td>
    `;
    expenseList.appendChild(tr);
  });
  total.textContent = totalAmount.toFixed(2);
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
}

// Load expenses from local storage
const storedExpenses = localStorage.getItem("expenses");
if (storedExpenses) {
  expenses = JSON.parse(storedExpenses);
  displayExpenses();
}