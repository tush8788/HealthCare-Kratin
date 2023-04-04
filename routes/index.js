const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/',homeController.home);

router.get('/signout',homeController.signout);

router.use('/admin',require('./Admin/index'));

module.exports=router;