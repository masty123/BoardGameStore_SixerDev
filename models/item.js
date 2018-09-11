let mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    player: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    stock: {
      type: Number,
      require: true;
    },
    price: {
      type: Number,
      require: true;
    }
});

let Item = module.exports = mongoose.model('Item', itemSchema);
