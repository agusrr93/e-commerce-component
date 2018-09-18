const Item = require('../models/Item')

class Controller {

  static getItems(req, res) {
    Item.find()
      .where('stock').gt(0)
      .then(items => {
        res.status(200).json(items)
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static createItem(req, res) {
    Item.create(req.body)
      .then(() => {
        res.status(201).json({message: 'Item created!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static updateItem(req, res) {
    Item.updateOne({_id: req.params.id}, req.body)
      .then(() => {
        res.status(200).json({message: 'Item updated!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static deleteItem(req, res) {
    Item.deleteOne({_id: req.params.id})
      .then(() => {
        res.status(200).json({message: 'Item deleted!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static findItemById(req, res) {
    item.findOne({_id: req.params.id})
      .then(item => {
        res.status(200).json(item)
      })
      .catch(err => {
        res,send(500).json({error: err.message})
      })
  }

}

module.exports = Controller