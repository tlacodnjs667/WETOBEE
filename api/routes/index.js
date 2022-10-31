const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');

router.get('/user', userRouter);
module.exports=router;