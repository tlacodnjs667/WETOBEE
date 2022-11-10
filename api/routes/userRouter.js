const express = require('express');
const router = express.Router();
const {userController} = require('../controllers')
const {validateToken} = require('../utils/auth');

router.post('/kakao/signin', userController.signInKakao);
router.get('/personal-information', validateToken, userController.getUserInfo);

module.exports = router;
