const mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
    todoText: String
});

let todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;