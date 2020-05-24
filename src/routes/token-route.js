'use strict';

const express = require('express');
const router = express.Router();
const authService=require('../services/auth-service');

router.post('/', authService.verifyGuard);

module.exports=router;