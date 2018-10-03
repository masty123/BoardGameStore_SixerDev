let mongoose = require('mongoose');

let promotionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    //0 for no discount
    //1 for get free
    //2 for overall percent discount
    //3 for product price discount
    type: {
        type: Number,
        required: true
    },
    //for type 3
    productID: {
        type: [String],
        required: false
    },
    //for type 1
    getFreeProductID: {
        type: [String],
        required: false
    },
    //for type 2 and 3
    discountValue: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

let Promotion = module.exports = mongoose.model('Promotion', promotionSchema);
