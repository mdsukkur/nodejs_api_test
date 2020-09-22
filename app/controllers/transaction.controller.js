const Transaction = require('../models/transaction.modal');

exports.create_a_transaction = (request, response) => {
    let transaction = new Transaction(request.body);

    Transaction.createTransaction(transaction, (err, data) => {
        if (err)
            response.send({
                status: false,
                message: err.message || "Some error occurred while creating the Transaction."
            });
        else response.send({status: true, insertID: data, message: "Successfully inserted new transaction"});
    });

};

exports.get_transactions_by_datewise = (req, res) => {
    Transaction.getTransactionsByDate(req.params.type || null, (err, data) => {
        if (err) {
            res.status(500).send({
                status: false, message: err.message || "Some error occurred while retrieving customers."
            });
        } else {
            let bkash = data.filter(value => value.operator === 1);
            let nagad = data.filter(value => value.operator === 2);
            let rocket = data.filter(value => value.operator === 3);

            let totalAmount = data.length > 0 ? data.map(value => value.amount).reduce((acc, value) => value + acc) : 0;
            let bkashTotal = bkash.length > 0 ? bkash.map(value => value.amount).reduce((acc, value) => value + acc) : 0;
            let nagadTotal = nagad.length > 0 ? nagad.map(value => value.amount).reduce((acc, value) => value + acc) : 0;
            let rocketTotal = rocket.length > 0 ? rocket.map(value => value.amount).reduce((acc, value) => value + acc) : 0;

            res.send({
                status: true,
                all: data,
                total_amount: parseFloat(totalAmount).toFixed(2),
                bkash: bkash,
                bkash_total_amount: parseFloat(bkashTotal).toFixed(2),
                nagad: nagad,
                nagad_total_amount: parseFloat(nagadTotal).toFixed(2),
                rocket: rocket,
                rocket_total_amount: parseFloat(rocketTotal).toFixed(2),
            });
        }

    });
};

exports.get_transaction_by_id = function (req, res) {
    Transaction.getTransactionById(req.params.transactionId, function (err, transaction) {
        if (err)
            res.send({status: false, message: err.sqlMessage || "Some error occurred while creating the Transaction."});
        res.send({status: true, data: transaction});
    });
};