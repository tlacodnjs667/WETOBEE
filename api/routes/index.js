const express = require('express');
const router = express.Router();

const orderRouter = require('./orderRouter');
const userRouter = require("./userRouter")
const planRouter = require("./planRouter")
const reviewRouter = require('./reviewRouter');

router.use('/order', orderRouter);
router.use('/auth', userRouter);
router.use('/user', userRouter);
router.use('/plan', planRouter);
router.use('/review', reviewRouter);

module.exports=router;
