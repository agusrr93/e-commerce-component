const ItemCat = require('../models/ItemCat')
const mongoose = require('mongoose')

class Controller {
  
  static getItemCat(req, res) {
    ItemCat.find()
      .populate('items')
      .then(itemCat => {
        res.status(200).json(itemCat)
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }


  static addItemCat(req, res) {
    ItemCat.updateOne({_id: req.body.cat_id}, {$push: {items:req.body.item_id}})
      .then(() => {
        res.status(200).json({message: 'Item added to category!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
   }

   static removeItemCat(req, res) {
    ItemCat.update({_id: req.body.cat_id}, {$pull: {items:req.body.item_id}})
      .then(() => {
        res.status(200).json({message: 'Berhasil dihapus dri category!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
   }

  static getAllItem(req,res){
    ItemCat.find().then(item=>{
      res.status(200).json(item)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static create(req, res) {
    ItemCat.create(req.body)
      .then(() => {
        res.status(201).json({message: 'Category created!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static update(req, res) {
    ItemCat.updateOne({_id: req.params.id}, req.body)
      .then(() => {
        res.status(200).json({message: 'Category updated!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static remove(req, res) {
    ItemCat.deleteOne({_id: req.params.id})
      .then(() => {
        res.status(200).json({message: 'Category deleted!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static findByName(req, res) {
    ItemCat.findOne({name: req.params.name})
      .populate('items')
      .then(data => {
        res.status(200).json(data)
      })
      .cath(err => {
        res.status(500).json({error: err.message})
      })
  }
  
}

module.exports = Controller