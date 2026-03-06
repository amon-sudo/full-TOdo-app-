import express from 'express'
import db from '../db.js'


const router = express.Router()


router.get('/', (req, res) =>{
    const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?")
    const todos = getTodos.all(req.userid)
    res.json(todos)
}) //get all to do for already loged in users

// creating a new to do

router.post('/', (req, res) =>{
    const {task} = req.body
    const insertTodo = db.prepare(`INSERT INTO todos ( user_id, task)
     VALUES(?, ?)`)
    const result = insertTodo.run(req.userid, task)


    res.json({ id: result.lastInsertRowid, task, completed: 0 })
})

//updating the to do list or using put

router.put('/:id', (req, res) =>{
    const {completed} = req.body
    const {id} = req.params
    

    const updatedTodo = db.prepare("UPDATE todos SET completed = ? WHERE id = ? ")
    updatedTodo.run(completed, id)

    res.json({message: "todo completed"})
})

//deleting a to do

router.delete('/:id', (req, res) => {
    const {id} =req.params
    const userid = req.userid
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deleteTodo.run(id, userid)
    res.send({message: "todo deleted"})
})

export default router