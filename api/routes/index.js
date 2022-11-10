const express = require('express');
const router = express.Router();

const orderRouter = require('./orderRouter');
const userRouter = require("./userRouter")

router.use('/order', orderRouter);
router.use('/auth', userRouter);
router.use('/user', userRouter);

module.exports=router;
