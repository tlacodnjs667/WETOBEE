const router = require('express').Router();
const { userController }  = require('../controllers');

router.get('/kakao/signin', userController.signInKakao);

module.exports = router;