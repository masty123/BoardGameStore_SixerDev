let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    address3: {
        type: String,
        required: true
    },
    address4: {
        type: String,
        required: true
    },
    address5: {
        type: String,
        required: true
    },
    history: {
        type: [String],
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    shopping_cart: {
        type: [String],
        required: true
    },
    wishlist: {
        type: [String],
        required: true
    },
    tel_num: {
        type: String,
        required: true
    }
});

let User = module.exports = mongoose.model('User', UserSchema);
