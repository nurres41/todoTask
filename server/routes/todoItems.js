const router = require('express').Router();
//import todoModel
const todoItemModel = require('../models/todoSchema')

//add todo item to our database
router.post('/api/item', async (req,res) => {
    try{
        const newItem = new todoItemModel({
            item: req.body.item,
            priority: req.body.priority,
            tags: req.body.tags,
            dateCreated: Date(),
        })
        //save in db
        const saveItem = await newItem.save()
        res.status(200).json(saveItem);
    }catch(err){
        res.json(err);
    }
})

//get data from db
router.get('/api/items', async(req,res) => {
    try{
        const allTodoItems = await todoItemModel.find({});
        res.status(200).json(allTodoItems)
    }catch(err){
        res.json(err);
    }
})

//update 
router.put('/api/item/:id', async (req,res) => {
    try{
        const updateItem = await todoItemModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.status(200).json("Todo item updated!")
    }catch(err){
        console.log(err)
    }
})

//Delete
router.delete('/api/item/:id', async (req,res) => {
    try {
        const deleteItem = await todoItemModel.findByIdAndDelete(req.params.id, {$set: req.body});
        res.status(200).json("Item has been deleted")
    } catch (error) {
        console.log(error)
    }
})

//Done
router.put('/api/item/done/:id', async (req,res) => {
    try {
        const done = await todoItemModel.findByIdAndUpdate(req.params.id,{done: true});
        res.status(200).json("Item done")
    } catch (error) {
        console.log(error)
    }
})

//Categorize
router.get('/api/items/life', async (req,res) => {
    try {
        const life = await todoItemModel.find({tags: { $eq: ["Life"]}});
        res.status(200).json(life)
    } catch (error) {
        console.log(error)
    }
})

//export router
module.exports = router;