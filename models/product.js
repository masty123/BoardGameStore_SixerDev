let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
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

let Product = module.exports = mongoose.model('Product', productSchema);
