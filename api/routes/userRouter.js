const router = require('express').Router();
const { userController }  = require('../controllers');

router.post('/kakao/signin', userController.signInKakao);

module.exports = router;