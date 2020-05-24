'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/event-controler');
const authService=require('../services/auth-service');


router.get('/',authService.authorize, controler.get);
router.get('/:idEvento',authService.authorize, controler.getById);
router.post('/',authService.authorize, controler.post);
router.put('/',authService.authorize, controler.put);
router.delete('/:idEvento',authService.authorize, controler.delete);
router.get('/myEvents',authService.authorize, controler.getMyEvents);
router.get('/eventsRegister',authService.authorize, controler.getEventsRegister);
router.get('/usersRegister/:idEvento',authService.authorize, controler.getUsersEvent);
router.post('/registerUserOfEvent',authService.authorize, controler.registerUserOfEvent);
router.post('/deleteUserOfEvent',authService.authorize, controler.deleteUserOfEvent);


module.exports=router;