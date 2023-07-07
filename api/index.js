const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const User = require('./models/User.js')
require('dotenv').config()

const port = 9001
const Salt = bcrypt.genSaltSync(10)
const jwtSecret = 'dfdflkfnkvkwnefknknmwekf'

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));


app.get('/', (req, res) => {
  res.json('Hola')
})

app.post('/login', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (isValidPassword) {
      jwt.sign({
        email: user.email,
        id: user._id,
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(user)
      })
    } else {
      res.status(422).json('password not ok')
    }
  } else {
    res.json('not found')
  }
})

app.post('/register', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
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

app.get('/profile', (req, res) => {
  mongoose.connect(process.env.MONGO_URL)
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await User.findById(userData.id)
      res.json({ name, email, _id })
    })
  } else {
    res.json({ message: 'problems in token' })
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName
  })
  res.json(newName)
})