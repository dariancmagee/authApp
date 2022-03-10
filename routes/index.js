var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET register page */
router.get("/register", (req, res, next) => {

  // Setting the auth token in cookies
  res.cookie('testtoken', "Test Cookie");
  res.render("register", { title: "Register Your Account" });
});

/* GET protected page */
// User logs in before accessing protected route
// When user logs in, create JWT, save as cookie
// When user accesses a protected route
// Use middleware to validate JWT 
// If valid, render router or next()
// else throw error, redirect to login

// Middleware helper function example
const isValidUser = (req, res, next) => {

  const authToken = req.cookies['token'];
  jwt.verify(
    authToken,
    secretKey,
    function (err, decoded) {
      console.log("Decoded", decoded); 
    }
  );

  // console.log("Users JWT is valid");
  // next();
  const userJWT = true;

  if (userJWT === true) {
    next();
  } else {
    res.redirect("/users");
  }
}

router.get("/protected", isValidUser, (req, res, next) => {
  res.send("Authorized user, protected route");
});

module.exports = router;
