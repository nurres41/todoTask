//import db
const mongoose = require('mongoose')

//create TodoItemSchema
const todoItemsSchema = new mongoose.Schema({
    item: {
        type:String,
    },
    priority: {
        type: String,
    },
    tags: {
        type: Array,
    },
    done: {
        type: Boolean,
    }
})

//export this schema
module.exports = mongoose.model('todo',todoItemsSchema);