const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const encrypt = require('../helpers/encrypt')

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
      })
]

const passValidator = [
    validate({
        validator: 'isLength',
        arguments: [7, 16],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
      })
]

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        validate: nameValidator
    },
    email : {
        type: String,
        unique: true,
        required : true,
        match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format!']
    },
    password : {
        type: String,
        required : true,
        validate: passValidator
    },
    purchase : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Purchase'
    }]
}, {timestamps:true})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function(next) {
  this.password = encrypt.hashPassword(this.password, this.email)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User