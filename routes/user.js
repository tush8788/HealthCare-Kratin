const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controller/home_controller');
const userController = require('../controller/user_controller');

//sign up page
router.get('/signup',homeController.signUpPageUser);

//sign in page
router.get('/signin',homeController.signInPageUser);
//create user
router.post('/create',homeController.create);
//create-session
router.post('/create-session',passport.authenticate('local',{failureRedirect:"/user/signin"}),passport.isUserOrNot,homeController.createSession);
//user dashboard
router.get('/dashboard',passport.checkAuthentication,passport.isUserOrNot,userController.dashboard);
//blood 
router.get('/bloodPressure',passport.checkAuthentication,passport.isUserOrNot,userController.bloodPressurePage)
//BMI
router.get('/BMICalculator',passport.checkAuthentication,passport.isUserOrNot,userController.BMI);
module.exports=router;