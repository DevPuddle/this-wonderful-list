//Decleared Variables
const express = require('express')
const app = express()
const PORT = 8500
const mongoose = require('mongoose')
const todotasks = require('./models/todotasks')
require('dotenv').config()
const TodoTask = require('./models/todotasks')

//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => { console.log('Connected to db!')}
)

app.get('/', async (req, res) => {
    try{
        TodoTasks.find({}, (err, tasks) => {
        res.render('index.ejs', {todotasks: tasks})
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT} better go catch it!`))