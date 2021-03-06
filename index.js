//Init App
const mongoose = require('mongoose');
const db = mongoose.connection;
const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');

let Renderer = require('./routes/renderer');

//Bring in Models
let Product = require('./models/product');
let Promotion = require('./models/promotion');
let User = require('./models/user');

const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

var new_arrival_product = ['Abyss', 'Abyss'];

mongoose.connect(config.database, {
  useNewUrlParser: true
});

db.on('error', console.error.bind(console, 'connection error:'));
//Check connection.
db.once('open', function() {
  console.log('connected to MongoDB.')
});


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Expression Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Expression Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      parm: formParam,
      msg: msg,
      value: value
    };
  }
}));

//Passport Config
require('./config/passport')(passport);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//Home Route
app.get('/', function(req, res) {
  Product.find({}, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      Promotion.find({}, function(err2, promotions) {
        if (err2) {
          console.log(err2);
        } else {
          res.render('home', {
            products: products,
            promotions: promotions,
            products_checker: products
          });
        }
      });
    }
  });
});

app.get('/new_arrival/:number', function(req, res) {
  var query = {
    name: new_arrival_product[req.params.number]
  }
  Product.findOne(query, function(err, product) {
    if (err) {
      req.flash('danger', 'Error loading new arrival');
      res.redirect('/');
    } else if (!product) {
      req.flash('danger', 'Sorry! New arrival product is not available at the moment.');
      res.redirect('/');
    } else {
      User.findById(product.admin, function(err, admin) {
        Renderer.renderWithObject(req, res, 'product_detail', {
          product: product
        });
      });
    }
  });
});


// Route Files
let account = require('./routes/account');
let cart = require('./routes/cart');
let checkout = require('./routes/checkout');
let wishlist = require('./routes/wishlist');
let product = require('./routes/product');
let page = require('./routes/page');
let promotion = require('./routes/promotion');
let browse = require('./routes/browse');
let admin_panel = require('./routes/admin_panel');
let transaction = require('./routes/transaction');

app.use('/account', account);
app.use('/cart', cart);
app.use('/checkout', checkout);
app.use('/wishlist', wishlist);
app.use('/product', product);
app.use('/page', page);
app.use('/promotion', promotion);
app.use('/browse', browse);
app.use('/admin_panel', admin_panel);
app.use('/transaction', transaction);

//set public folder.
app.use(express.static(path.join(__dirname, 'public')));
//Start the server.
app.listen(process.env.PORT || 3000, () => console.log('Sixer-Dev listening on port 3000!'))
