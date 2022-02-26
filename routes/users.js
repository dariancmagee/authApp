var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Sequelize = require('sequelize');
const { Users } = require('../models');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  //res.send('respond with a resource');
  const users = await Users.findAll()
  res.json(users)
});

router.post('/', (req, res, next) => {

  const password = "hello"

  const saltRounds = bcrypt.genSaltSync(5);
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

router.post('/login', (req, res, next) => {

  const password = "last dragon";
  const wrongPassword = "not last dragon";

  const saltRounds = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, saltRounds);
  const comparePass = bcrypt.compareSync(password, hash);
  const wrongComparePass = bcrypt.compareSync(wrongPassword, hash);

  
  console.log("my password", password);
  console.log("my hashed password", hash);
  console.log("Is password correct", comparePass);
  console.log("Is passowrd correct", wrongComparePass);

res.send("Passowrd Checker");


});

module.exports = router;
