const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const bcrypt = require('bcrypt')

const User = require('./models/User.js')

const port = 9001
const Salt = bcrypt.genSaltSync(10)


app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URL)
app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, Salt)
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})