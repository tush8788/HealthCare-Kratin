const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controller/home_controller');
const adminController = require('../controller/admin_controller');

router.get('/signin',homeController.signInPageAdmin);

router.get('/signup',homeController.signUpPageAdmin);

router.post('/create',homeController.create);

router.post('/createSession',passport.authenticate('local',{failureRedirect:"/admin/signin"}),passport.isAdminOrNot,homeController.createSession);

router.get('/dashboard',passport.checkAuthentication,passport.isAdminOrNot,adminController.dashboard);

module.exports = router;