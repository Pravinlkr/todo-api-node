var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todoModel = require('../models/todo-model');

/* GET Todo page. */
router.get('/', function(req, res, next) {
  res.send('Todo route works');
});

// add a single todo
router.post('/add', function(req, res, next) {
    let newTodo = new todoModel({
      todoText: req.body.todoText
    });

    newTodo.save((err, newTodo) => {
        if (err) {
          res.send(err);
        } else {
            res.send({status: 200, message : 'New todo added successfully', todoObj : newTodo })
        }
    })
});

// List all todo
router.get('/list', function(req, res, next) {
    todoModel.find((err, response) => {
        if (err) {
          res.send(err);
        } else {
            res.send({status: 200, totalResult: response.length, todos : response })
        }
    })
});

// search by todo text name
router.get('/search', function(req, res, next) {
    todoModel.find({todoText : req.query.todoText}, (err, response) => {
        if (err) {
          res.send(err);
        } else {
            res.send({status: 200, totalResult: response.length, todos : response })
        }
    })
});

// get single todo info
router.get('/searchById', function(req, res, next) {
    todoModel.findById(req.query.id, (err, response) => {
        if (err) {
          res.send(err);
        } else {
            res.send({status: 200, todos : response })
        }
    })
});

// update / edit single todo
router.put('/update', function(req, res, next) {
    todoModel.findByIdAndUpdate(req.body.id, {todoText : req.body.todoText}, (err, response) => {
        if (err) {
          res.send(err);
        } else {
            res.send({status: 200, message : 'Todo updated successfully' })
        }
    })
});

// delete single todo
router.delete('/delete', function(req, res, next) {
    todoModel.findByIdAndDelete(req.body.id, (err, response) => {
        if (err) {
          res.send(err);
        } else {
            res.send({status: 200, message : 'Todo deleted successfully' })
        }
    })
});

module.exports = router;
