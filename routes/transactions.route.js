module.exports = app => {
    const transactions = require("../app/controllers/transaction.controller");

    app.post("/transactions", transactions.create_a_transaction);
    app.get("/transactionsByDate/:type?", transactions.get_transactions_by_datewise);
    app.get("/transactionsById/:transactionId", transactions.get_transaction_by_id);
};