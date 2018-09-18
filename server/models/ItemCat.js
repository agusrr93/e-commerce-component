const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const itemCatSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        unique: true
      },
      items : [{
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Item'
      }]
})

itemCatSchema.plugin(uniqueValidator)

const ItemCat = mongoose.model('ItemCat', itemCatSchema)

module.exports = ItemCat