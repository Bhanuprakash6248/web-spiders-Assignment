const express = require('express');
const { signup,Login } = require('../controllers/userController');

const userRoute = express.Router();


userRoute.post("/signup",signup)  //register
userRoute.post("/login",Login)    //Login

module.exports = userRoute