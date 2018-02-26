const express = require('express');
const app = express();
const ItemRouter = express.Router();
const Item = require('../models/Item.model');

ItemRouter.route('/').get(function (req, res) {
   Item.find(function (err, items){
      if(err){
        console.log(err);
      }
      else {
        res.render('index', {items: items});
      }
    });
});

ItemRouter.route('/create').get(function (req, res) {
   res.render('create');
 });

 ItemRouter.route('/post').post(function (req, res) {
   const item = new Item(req.body);
   console.log(item);
   item.save()
     .then(item => {
     res.redirect('/items');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });

ItemRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Item.findById(id, function (err, item){
       res.render('edit', {item: item});
   });
 });

 ItemRouter.route('/update/:id').post(function (req, res) {
   Item.findById(req.params.id, function(err, item) {
     if (!item)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       item.name = req.body.name;
       item.price = req.body.price;
 
       item.save().then(item => {
           res.redirect('/items');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });

 ItemRouter.route('/delete/:id').get(function (req, res) {
   Item.findByIdAndRemove({_id: req.params.id},
        function(err, item){
         if(err) res.json(err);
         else res.redirect('/items');
     });
 });

module.exports = ItemRouter;