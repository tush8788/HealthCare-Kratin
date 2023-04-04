const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/',homeController.home);

router.get('/signout',homeController.signout);
// admin
router.use('/admin',require('./admin'));
// user
router.use('/user',require('./user'));

module.exports=router;