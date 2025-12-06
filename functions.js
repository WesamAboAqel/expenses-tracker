const allowedFields = ["description", "amount", "date"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const dateConverter = (date) => {
    date = new Date(date)
    
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return `${day}-${months[month]}-${year}`
}

const checkAmount = (dummyExpense) => {
    return (Number(dummyExpense["amount"]) && parseInt(dummyExpense["amount"]) > 0)
}

const printExpenses = (expenses) => {
    // console.log(expenses)
    console.log(`# ${"ID".padEnd(5)} | ${"Description".padEnd(20)} | ${"Amount".padEnd(7)} | Date`)
    expenses.forEach(expense => {
        console.log(
            `# ${String(expense.id).padEnd(5)} | ${expense.description.padEnd(20)} | ${String(expense.amount)+"$".padEnd(5)} | ${dateConverter(expense.date)}`
        )
    })
}

export const addExpense = (stack,expenses) => {
    const dummyExpense = {};

    while(stack.length > 0){
        if(stack[0].slice(0,2) !== "--"){
            console.log("Please use proper flags, refer to the ReadMe for usage");
            return expenses;
        }

        const flag = stack.shift().slice(2);

        if(allowedFields.indexOf(flag) === -1){
            console.log("Flag usage is wrong!");
            return expenses;
        };

        dummyExpense[flag] = stack.shift();
    }

    //Expense Amount
    if(!checkAmount(dummyExpense)){
        console.log("Invalid Amount!");
        return expenses
    }

    dummyExpense["amount"] = parseInt(dummyExpense["amount"])

    const expense = {
        id: expenses.length + 1,
        description: dummyExpense["description"] ? dummyExpense["description"] : "Some Expenses",
        amount: dummyExpense["amount"] ? dummyExpense["amount"] : 10,
        date: dummyExpense["date"] ? dummyExpense["date"] : new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    }

    expenses.push(expense)

    console.log(`# Expense added successfully (ID: ${expense.id})`)
    return expenses
}

export const deleteExpense = (stack,expenses) => {
    const flag = stack.shift().slice(2);
    if(flag !== "id"){
        console.log("Invalid Argument!");
        return expenses;
    }
    const value = parseInt(stack.shift());
    

    const expenseIndex = expenses.findIndex(expense => expense[flag] === value);

    if(expenseIndex === -1){
        console.log("Expense not Found!");
        return expenses;
    }

    expenses.splice(expenseIndex,1)

    console.log(`# Expense deleted successfully (ID: ${value})`)

    return expenses
}

export const updateExpense = (stack,expenses) => {
    const flag = stack.shift().slice(2);
    const value = parseInt(stack.shift());
    

    let expense = expenses.find(expense => expense[flag] === value);

    if(!expense){
        console.log("No Expense with that ID was found!");
        return expenses;
    }

    const dummyExpense = {};

    while(stack.length > 0){
        if(stack[0].slice(0,2) !== "--"){
            console.log("Please use proper flags, refer to the ReadMe for usage");
            return expenses;
        };

        const flag = stack.shift().slice(2);

        if(allowedFields.indexOf(flag) === -1){
            console.log("Flag usage is wrong!");
            return expenses;
        };

        dummyExpense[flag] = stack.shift();
    };

    //Expense Amount
    if(dummyExpense["amount"] && !checkAmount(dummyExpense)){
        console.log("Invalid Amount!");
        return expenses;
    };
    // Updating Description
    expense["description"] = dummyExpense["description"] ? dummyExpense["description"] : expense["description"];

    // Updating Amount
    expense["amount"] = dummyExpense["amount"] ? parseInt(dummyExpense["amount"]) : expense["amount"];

    // Updating Date
    expense["date"] = dummyExpense["date"] ? dummyExpense["date"] : expense["date"];

    
    expense["updated_at"] = new Date();


    console.log("Expense Updated Successfully!")

    printExpenses([expense]);

    return expenses;
}

export const listExpenses = (stack,expenses) => {
    if(stack.length === 0){
        printExpenses(expenses);
        return;
    }
    //TODO: Add Filtering to the Listing. 
}

export const summaryExpense = (stack,expenses) => {
    if(stack.length === 0){

        const amount = expenses.reduce((acc,expense) => {
            return acc + expense.amount;
        },0);

        console.log(`# Total expenses: $${amount}`);

    }else{
        const flag = stack.shift().slice(2);

        if(flag !== "month"){
            console.log("# Invalid Argument!");
            return;
        }

        const value = parseInt(stack.shift());

        const requestedMonth = months[value-1];

        const amount = expenses.filter(expense => {
            const date = new Date(expense.date);
            const month = months[date.getMonth()];
            
            return requestedMonth === month;
        })
        .reduce((acc,expense) => acc + expense.amount,0);

        console.log(`# Total expenses for ${requestedMonth}: $${amount}`);
    }
};