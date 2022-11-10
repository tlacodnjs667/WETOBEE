const express = require('express');
const router = express.Router();

const orderRouter = require('./orderRouter');
const userRouter = require("./userRouter")
const reviewRouter = require('./reviewRouter');

router.use('/order', orderRouter);
router.use('/auth', userRouter);
router.use('/user', userRouter);
router.use('/review', reviewRouter);

module.exports=router;
