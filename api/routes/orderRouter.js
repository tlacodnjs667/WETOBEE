const express = require('express');
const router = express.Router();
const {validateToken} = require('../utils/auth')
const {orderController} = require('../controllers');


router.post('', orderController.addOrder);
router.get('', validateToken, orderController.getOrderInfoByUserId);

module.exports=router;