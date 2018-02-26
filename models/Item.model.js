// Item.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
  name: {
    type: String
  },
  model: {
     type: String
  },
  price: {
     type: Number
  }
},{
    collection: 'Items'
});

module.exports = mongoose.model('Item', Item);