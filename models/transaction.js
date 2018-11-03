let mongoose = require('mongoose');

let transactionSchema = mongoose.Schema({
    date_ordered: {
        type: Date,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    productID: {
        type: [String],
        required: true
    },
    promotionID: {
        type: String,
        required: true
    },
    calculatedPrice: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    tel_num: {
        type: String,
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true
    },
    isCancelled: {
        type: Boolean,
        required: true
    }
});

let Transaction = module.exports = mongoose.model('Transaction', transactionSchema);
