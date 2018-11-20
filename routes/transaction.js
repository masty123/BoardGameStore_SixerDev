const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Transaction = require('../models/transaction');

//Transaction
router.get('/', function(req, res){
  res.redirect('/admin_panel');
});

//Deliver and finish transaction
router.post('/deliver/:id', function(req,res){
  let transaction = {};
  transaction.isDelivered = true;
  let query = {
    _id: req.params.id
  }
  Transaction.updateOne(query, transaction, function(err) {
    if (err) {
      console.log(err)
      return
    } else {
      req.flash('success', 'Transaction delivered');
      res.redirect('/admin_panel');
    }
  });
});

//Cancel transaction
router.post('/cancel/:id', function(req,res){
  let transaction = {};
  transaction.isCancelled = true;
  let query = {
    _id: req.params.id
  }
  Transaction.updateOne(query, transaction, function(err) {
    if (err) {
      console.log(err)
      return
    } else {
      req.flash('warning', 'Transaction cancelled');
      res.redirect('/admin_panel');
    }
  });
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> origin/master
