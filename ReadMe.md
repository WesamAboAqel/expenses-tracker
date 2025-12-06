# Expense Tracker CLI

A simple and efficient **command-line expense manager** built with **Node.js**.
This tool allows you to **add**, **update**, **delete**, **list**, and **summarize** expenses directly from the terminal.
All data is stored locally inside `expenses.json`.

This project is built as part of the roadmap.sh challenge:
[https://roadmap.sh/projects/expense-tracker](https://roadmap.sh/projects/expense-tracker)

---

## Features

* Add new expenses with description, amount, and date
* Update existing expenses
* Delete expenses by ID
* List all expenses in a formatted table
* View total expenses
* View total expenses for a specific month
* JSON-based storage (no external dependencies)

---

## Installation

```
git clone (https://github.com/WesamAboAqel/expenses-tracker)
cd expense-tracker
npm link
```

After linking, you can run the CLI globally using:

```
expense-tracker <command>
```

---

## Usage

### 1. Add an expense

```
expense-tracker add --description "Lunch" --amount 20 --date 2025-01-02
```

If the date is not provided, **today's date** is used.

---

### 2. List all expenses

```
expense-tracker list
```

Example output:

```
# ID    | Description          | Amount  | Date
# 1     | Lunch                | 20$     | 2-January-2025
# 2     | Coffee               | 5$      | 2-January-2025
```

---

### 3. Update an expense

```
expense-tracker update --id 1 --amount 30
```

Supported update flags:

* `--description`
* `--amount`
* `--date`

Only the provided fields are updated.

---

### 4. Delete an expense

```
expense-tracker delete --id 2
```

---

### 5. Summary of all expenses

```
expense-tracker summary
```

Output example:

```
# Total expenses: $60
```

---

### 6. Summary for a specific month

```
expense-tracker summary --month 1
```

Output example:

```
# Total expenses for January: $40
```

---

## Flags

| Flag            | Meaning                        | Required                     |
| --------------- | ------------------------------ | ---------------------------- |
| `--description` | Description of the expense     | Yes (add)                    |
| `--amount`      | Amount spent (must be > 0)     | Yes (add)                    |
| `--date`        | Date of expense (YYYY-MM-DD)   | Optional                     |
| `--id`          | Expense ID (for update/delete) | Yes (update/delete)          |
| `--month`       | Month number (1–12)            | Required for monthly summary |

---

## File Structure

```
.
├── app.js              # CLI entry point
├── functions.js        # Main logic for commands
├── expenses.json       # Local storage
└── README.md
```

---

## Internals & Logic

* All expenses are stored in `expenses.json`
* Each expense contains:

```
{
  id: number,
  description: string,
  amount: number,
  date: Date|string,
  created_at: Date,
  updated_at: Date
}
```

* Only the fields: **description**, **amount**, **date** are user-editable
* Amounts are validated and converted to integers
* Dates are formatted as: `day-Month-Year`

---

## Example Workflow

```
expense-tracker add --description "Dinner" --amount 15
expense-tracker add --description "Snacks" --amount 5
expense-tracker list
expense-tracker update --id 1 --amount 20
expense-tracker summary
expense-tracker summary --month 1
```

---

## License

MIT License

---

If you want, I can also write a short LinkedIn-optimized announcement post for this project.
