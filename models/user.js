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
    history: {
        type: [String],
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true
    }
});

let User = module.exports = mongoose.model('User', UserSchema);
