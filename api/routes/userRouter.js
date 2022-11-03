const express = require('express');
const router = express.Router();
const {userController} = require('../controllers')
const {validateToken} = require('../utils/auth');

router.get('/personal-information', validateToken, userController.getUserInfo);
router.post('/kakao/signin', userController.signInKakao);

module.exports = router;
