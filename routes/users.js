var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS
const Sequelize = require('sequelize');
const { Users } = require('../models');
const jwt = require('jsonwebtoken');

console.log("user.js salt rounds are:", saltRounds);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.render("index");
  // const users = await Users.findAll()
  // res.json(users)
});

router.post('/', (req, res, next) => {

  const password = "hello"

  const hash = bcrypt.hashSync(password, saltRounds);

  console.log("my password", password);
  console.log("my hashed password", hash);

// bcrypt.hash(myPassword, saltRounds, (err, hash) => {



});

/* POST register a new user. */
router.post("/register", async (req, res, next) => {
  let { username, password, email } = req.body;
  const saltRounds = bcrypt.genSaltSync(5);
  password = bcrypt.hashSync(password, saltRounds);
  const newUser = await Users.create({
    username,
    password,
    email,
  });

  res.json({
    newUser,
  });
  console.log("added new user:", username, password, email);
});

router.post('/login', async (req, res, next) => {
  const {username, password} = req.body;

  const saltRounds = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, saltRounds);
  
  const users = await Users.findOne({
    where: {
      username: username
    }
  });
  
  const dbPassword = users.password;
  console.log("db password", dbPassword);
  console.log("hashed Password", hash);
  const comparePass = bcrypt.compareSync(password, dbPassword);
  
  console.log("compare", comparePass);
  
  if (comparePass) {
    const token = jwt.sign({
      data: username,
    }, 
    secretKey, // hide from everyone but our app 
      { expiresIn: '1h' });
    
    console.log('Password worked!', token);
    res.cookie('token', token);
    res.redirect('/');
  } else {
    console.log('Password did not work');
    res.send("Not authorized")
  }
  
  res.json(users);

  console.log(users);

});

module.exports = router;
