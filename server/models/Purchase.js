const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema({
      userId: String,
      itemId: 
        {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Item'
        },
      qty: Number,
      totalPrice: Number
})

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase