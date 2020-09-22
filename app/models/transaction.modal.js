const db = require('../../config/db.config');

//Transaction object constructor
var Transaction = function (trans) {
    this.mobile = trans.mobile;
    this.amount = trans.amount;
    this.txn_id = trans.txn_id;
    this.total_current_balance = trans.total_current_balance;
    this.operator = trans.operator;
    this.operator_type = trans.operator_type;
    this.message = trans.message;
};

Transaction.createTransaction = function (newTask, result) {
    db.query("INSERT INTO transactions set ?", newTask, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Transaction.getTransactionsByDate = (type, result) => {
    /*let sql = "SELECT * FROM transactions";*/
    let sql = "";
    let datetime = new Date();

    let filterDate = `${datetime.toISOString().slice(0, 10)}%`;

    if (type === '' || type === null) {
        sql = "SELECT * FROM transactions where created_at like ?";
    } else if (type === 'all') {
        sql = "SELECT * FROM transactions";
    } else {
        sql = "SELECT * FROM transactions where created_at like ?";
        filterDate = `${type}%`;
    }

    db.query(sql, filterDate, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Transaction.getTransactionById = function (transactionId, result) {
    db.query("Select * from transactions where id = ? ", transactionId, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Transaction;