const User = require('../models/User')
const Item = require('../models/Item')
const Purchase = require('../models/Purchase')
const jwt = require('jsonwebtoken')
const encrypt = require('../helpers/encrypt')

class Controller {
  
  static register(req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.status(201).json({message: 'User created!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static getall(req,res){
    User.find().then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
  }
  
  static login(req, res) {
    let hashed = encrypt.hashPassword(req.body.password, req.body.email)
    
    User.findOne({email: req.body.email, password: hashed})
      .then(user => {
        let obj = {
          id: user._id,
          name: user.name,
          email: user.email
        }
        
        jwt.sign(obj,'hello', (err, token) => {
          if (err) {
            res.status(500).json({error: err.message})
          } else {
            res.status(200).json({message: 'Login berhasil!', token: token, userId: obj.id, cart: user.cart, purchase: user.purchase})
          }
        })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static findById(req, res) {
    if (req.params.id === req.decoded.id) {
      User.findById(req.params.id)
        .populate('cart')
        .populate('purchase')
        .then(user => {
          res.status(200).json(user)
        })
        .catch(err => {
          res.status(500).json({error: err.message})
        })
    } else {
      res.status(403).json({error: 'You are not allowed to view this user!'})
    }
  }
  
  static update(req, res) {
    if (req.params.id === req.decoded.id) {
      if (req.body.password.length < 7 || req.body.password.length > 16) {
        res.status(500).json({error: 'Password should be between 7 and 16 characters'})
      }
      
      req.body.password = encrypt.hashPassword(req.body.password, req.decoded.email)

      User.updateOne({_id: req.params.id}, req.body)
        .then(() => {
          res.status(200).json({message: 'User updated!'})
        })
        .catch(err => {
          res.status(500).json({error: err.message})
        })
    } else {
      res.status(403).json({error: 'You are not allowed to view this user!'})
    }
  }
  
  static remove(req, res) {
    if (req.params.id === req.decoded.id) {
       User.deleteOne({_id: req.params.id})
        .then(() => {
          res.status(200).json({message: 'User deleted!'})
        })
        .catch(err => {
          res.status(500).json({error: err.message})
        })
    } else {
      res.status(403).json({error: 'You are not allowed to delete this user!'})
    }
  }
  
  static addCart(req, res) {
    User.updateOne({_id: req.decoded.id}, {$push: {cart: req.params.idItem}})
      .then(() => {
        res.status(200).json({message: 'Item added to cart!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
  
  static checkout(req, res) {
    // console.log(req.body);
    // req.body.itemId.forEach((id, index) => {
    //   let beli = req.body.purchase[index].qty
    // 
    //   Item.updateOne({_id: id}, {$set: {stock: }})
    //     .then(item => {
    // 
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // })
    Purchase.insertMany(req.body.purchase)
      .then(() => {
        res.status(200).json({message: 'Item purchased!'})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err.message})
      })
   }
  
}

module.exports = Controller