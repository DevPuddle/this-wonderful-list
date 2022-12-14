//Decleared Variables
const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 8500
const mongoose = require('mongoose')
require('dotenv').config()
const TodoTasks = require('./models/todotasks')

//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => { console.log('Connected to db!') }
)

app.get('/', async (req, res) => {
    try {
        TodoTasks.find({}, (err, tasks) => {
            res.render("index.ejs", {
                todoTasks: tasks
            })
        })
    } catch (err) {
        response.status(500).send({message: error.message})
    }
})

app.post('/', async(req, res) => {
    const todotasks = new TodoTasks(
         {
            title: req.body.title,
            content: req.body.content
         }
    )
    try {
        await todotasks.save()
        console.log(TodoTasks)
        res.redirect('/')
    } catch(err) {
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//EDIT OR UPDATE METHOD
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id
        TodoTasks.find({}, (err, tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask: id })
            })
        })
    .post((req, res) => {
        const id = req.params.id
        TodoTasks.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })

//DELETE
app
    .route("/remove/:id")
    .get((req,res) => {
        const id = req.params.id
        TodoTasks.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })
 

app.listen(PORT, () => console.log(`Server is running on port ${PORT} better go catch it!`))