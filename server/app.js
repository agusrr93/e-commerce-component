const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items')
const itemCatRouter = require('./routes/itemCat')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Mongo_URI=process.env.MONGODATA

mongoose.connect(Mongo_URI, { useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!');
});

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/api/itemCat', itemCatRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(3000,function(){
  console.log('listen on port 3000')
})
module.exports = app;
