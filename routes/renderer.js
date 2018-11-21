//Bring in Product model
let Product = require('../models/product');

module.exports = {
  renderWithObject: function(req, res, page, parserObject) {
    Product.find({}, function(err, products_checker) {
      if (err) {
        console.log(err);
      } else {
        parserObject.products_checker = products_checker;
        res.render(page, parserObject);
      }
    });
  },
  render: function(req, res, page) {
    Product.find({}, function(err, products_checker) {
      if (err) {
        console.log(err);
      } else {
        res.render(page, {
          products_checker: products_checker
        });
      }
    });
  }
}
