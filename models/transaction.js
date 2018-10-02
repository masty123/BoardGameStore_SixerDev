let mongoose = require('mongoose');

let transactionSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    itemID: {
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
