import express from 'express'
import prisma from '../prismaClient.js'


const router = express.Router()


router.get('/',async (req, res) =>{
    const todos = await prisma.todo.findMany({
        where:{
            userId: req.userId
        }
    })
    res.json(todos)
}) //get all to do for already loged in users

// creating a new to do

router.post('/',async (req, res) =>{
    const {task} = req.body
    const todo = await prisma.todo.create({
        data:{
            task,
            userId: req.userId
        }
    })

    res.json(todo)
})

//updating the to do list or using put

router.put('/:id', async(req, res) =>{
    const {completed} = req.body
    const {id} = req.params
    
    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.body
        },
        data: {
            completed: !!completed
        }
    })
    

    res.json(updatedTodo)
})

//deleting a to do

router.delete('/:id',async (req, res) => {
    const {id} =req.params
    const userId = req.userid
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId

        }
    }) 
    res.send({message: "todo deleted"})
})

export default router