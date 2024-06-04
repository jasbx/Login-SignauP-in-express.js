const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const bcrypt = require("bcrypt")
app.use(express.urlencoded({ extended: true }));
const User = require('../src/config')
const port = 3000;
app.set('view engine', 'ejs')
//GET
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/signup', (req, res) => {
  res.render('signup')
})
//SignUp

app.post('/signup', async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  //Check user
  const Check = await User.findOne({ email: data.email })

  if (Check) {
    res.send('user already in !')
  }

  else {
    //HashPassword
    const hash = await bcrypt.hash(data.password, 10)
    data.password = hash
    const users = await User.insertMany(data)
    console.log(users)
  }
})

//Login 

app.post('/login', async (req, res) => {
  const check = await User.findOne({ email: req.body.email })
  if (!check) {
    res.send('user not found')
  } else {
    const isPassword = await bcrypt.compare(req.body.password, check.password)
    if (isPassword) {
      res.send('home')
    }
  }
})
mongoose.connect("mongodb+srv://gloop216:t6OwXxDJu1KR9YA3@cluster0.nryicsp.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });



//===================================
