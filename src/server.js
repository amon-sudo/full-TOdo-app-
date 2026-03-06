
import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todo-Routes.js'
import authMiddleware from './middleware/authMiddleware.js'
const app = express()




const PORT = process.env.PORT|| 3000
//we need to get file path from the url of the current module
const __filename = fileURLToPath(import.meta.url)
//we also need to get the directory name from the file path
const __dirname = dirname(__filename)
//now thids end point down here is for 
// serving the html file from the public directory where we have the html and the css files stored in other words, the route down here is for the html
//THIS SECTION IS STRICTLY FOR MIDDLE WARES
app.use(express.json()) // this one as i know is for enabling the json received
// now it still thinks that the files are in the src folder when they are actually in the public 
// folder so we have tell itwhere the are actually. and also we  need the express mildware
// THIS middleware was helpsul to load the frontend file.
app.use(express.static(path.join(__dirname, '../public'))) 



//here is where we have called the path.
app.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname, '../public', 'index.html')) // now this is how the html will find the 
})


//ROUTES

app.use('/auth', authRoutes)
app.use('/todos', authMiddleware,  todoRoutes)

app.listen(PORT, () =>{
    console.log(`server now running on: ${PORT}`)
})