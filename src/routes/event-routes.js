'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/event-controler');
const authService=require('../services/auth-service');

router.get('/myEvents',authService.authorize, controler.getMyEvents);
router.get('/eventsRegister',authService.authorize, controler.getEventsRegister);

router.get('/page/',authService.authorize, controler.get);
router.post('/',authService.authorize, controler.post);
router.put('/',authService.authorize, controler.put);
router.post('/registerUserOfEvent',authService.authorize, controler.registerUserOfEvent);
router.post('/deleteUserOfEvent',authService.authorize, controler.deleteUserOfEvent);

router.get('/page/:page',authService.authorize, controler.get);
router.get('/usersRegister/:idEvento',authService.authorize, controler.getUsersEvent);
router.get('/:idEvento',authService.authorize, controler.getById);
router.delete('/:idEvento',authService.authorize, controler.delete);

module.exports=router;