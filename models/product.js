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
  maxPlayer: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  sold: {
    type: Number,
    required: true
  },
  admin: {
    type: String,
    required: true
  },
  likes: {
    type: [String],
    required: true
  }
});

let Product = module.exports = mongoose.model('Product', productSchema);
