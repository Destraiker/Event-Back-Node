'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/user-controler');
const authService=require('../services/auth-service');

//router.get('/', controler.get);
router.get('/',authService.authorize, controler.getById);
router.post('/', controler.post);
router.put('/',authService.authorize, controler.put);
router.delete('/',authService.authorize, controler.delete);
router.post('/login', controler.login);

module.exports=router;