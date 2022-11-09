const express = require('express');
const router = express.Router();
const {reviewController} = require('../controllers');
const {validateToken} = require('../utils/auth');
const awsUploader = require('../utils/awsUploader');


router.post('/create', validateToken, awsUploader, reviewController.addReview);
router.delete('/delete', validateToken, reviewController.deleteReview);
router.get('/plans', reviewController.getReviewByPlanId);
router.get('/images', reviewController.getReviewImage);
router.get('/user', validateToken, reviewController.getReviewByUserId);
router.post('/like', validateToken, reviewController.likeReview);
router.get('/get-like', validateToken, reviewController.getReviewLikesByUserId);
router.delete('/delete-like', validateToken, reviewController.deleteReviewLike);

module.exports = router;