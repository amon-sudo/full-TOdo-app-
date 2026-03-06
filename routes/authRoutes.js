import express, { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()
// register a new user i.e /auth/register
router.post('/register', (req, res) =>{
    // the username will be saved in the database but not directly, in a reversable or token  like mode.
    //example the email i.e amonogino@gmail.com will be saved as a encrypted 
    const {username, password} = req.body
    
    //we now have to encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)
    console.log(hashedPassword)
    // to save the new user and the hashpassword in the database
    try{
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`)
            const result = insertUser.run(username, hashedPassword)

            //now that we already have a new user, we want to create a default to do, or show them there way 
            // around the website

            const defaultTodo = `Hello! Add your first todo!`
            const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
                VALUES (?, ?)`)
            insertTodo.run(result.lastInsertRowid, defaultTodo)


            // create token that will allow to add there todo

            const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'}) 
            res.json({  token })
                
                 
            

    } catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }







} )
router.post('/login', (req, res)=>{
    //when loggin in, we gate the email abd check the password associated with the email.
    //but not directly, the password entered by the user will have 
    // to be dycripted and compared to the one one in the database. not the real passwored but the encrypted one
    const {username, password} = req.body


    try{
        const getUser = db.prepare('SELECT * FROM USERS WHERE USERNAME == ?')
        const user = getUser.get(username)
        // check the username if not available will jump out of the function
        if(!user) {return res.status(404).send({ message: "user not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if password dosent matych exit
        if (!passwordIsValid) {return res.status(401).send({message: "not a valid password"})}
        console.log(user)
        //succeful authentication
        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {expiresIn: "24h"})
        res.json({token})

    } catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

export default router