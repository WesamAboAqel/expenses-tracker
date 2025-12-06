#!/usr/bin/env node
import fs from "fs";
import { addExpense, deleteExpense, updateExpense, listExpenses, summaryExpense } from "./functions.js";

const [, , command, ...args] = process.argv;

if(!fs.existsSync("expenses.json")){
    fs.writeFileSync("expenses.json", "[]")
}

const readFile = () => {
    const rawData = fs.readFileSync("expenses.json", "utf8");
    return JSON.parse(rawData);
};

const saveFile = (data) => {
    fs.writeFileSync("expenses.json", JSON.stringify(data,null,4));
};

let expenses = readFile();


switch (command) {
        case "add":
            expenses = addExpense(args,expenses);
            break;
    
        case "update":
            expenses = updateExpense(args,expenses);
            break;

        case "delete":
            expenses = deleteExpense(args,expenses);
            break;

        case "summary":
            summaryExpense(args,expenses);
            break;

        case "list":
            listExpenses(args,expenses);
            break;
    
        default:
            break;
    }



saveFile(expenses);