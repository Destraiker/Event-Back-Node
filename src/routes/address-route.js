'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/address-controler');
const authService=require('../services/auth-service');

router.get('/',authService.authorize, controler.get);
router.get('/:idEndereco',authService.authorize, controler.getById);
router.post('/',authService.authorize, controler.post);
router.put('/',authService.authorize, controler.put);
router.delete('/:idEndereco',authService.authorize, controler.delete);

module.exports=router;