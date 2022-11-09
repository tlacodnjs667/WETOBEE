const {reviewDao, orderDao} = require('../models');

const orderStatusEnum = require('../utils/orderStatusEnum');

const addReview = async(userId, planId, content, imageUrl) => {

    const orderInfoForCheck = await orderDao.checkOrder(userId, planId);

    if(!orderInfoForCheck.length) {
        const error = new Error('THIS_USER_DOES_NOT_HAVE_ACCESSIBILITY');
        error.statusCode = 400;
        throw error;
    }

    const checkOrderStatus = await orderDao.checkOrder(userId, planId);
    if(checkOrderStatus[0].orderStatus == orderStatusEnum['before payment']){
        const error = new Error('PAY_FIRST');
        error.statusCode = 400;
        throw error;
    }
    
    const checkReview = await reviewDao.checkDuplication(userId, planId);

    if(checkReview.length) {
        const error = new Error('DUPLICATED_REVIEW');
        error.statusCode = 400;
        throw error;
    }
    const DEFAULT_CATEGORY_ID = 2;

    const addedReviewId = await reviewDao.addReview(userId, planId, DEFAULT_CATEGORY_ID,content, imageUrl);
    
    return addedReviewId.insertId;
}

const getReviewByPlanId = async(planId, limit, offset) => {

    const reviewInfo = await reviewDao.getReviewByPlanId(planId, limit, offset);

    return reviewInfo;
}

const deleteReview= async(reviewId, userId) => {
    const checkReviewCreator = await reviewDao.checkReview(reviewId, userId);
    
    if(!checkReviewCreator.length) {
        const error = new Error('UNDEFINED_REVIEW');
        error.statusCode = 400;
        throw error;
    }

    return await reviewDao.deleteReview(reviewId);
}

const getReviewImage=async(limit, offset)=>{
    
    const reviewImages = await reviewDao.getReviewImage(limit, offset);

    return reviewImages;
}

const getReviewByUserId=async( userId, limit, offset)=>{
    const reviewInfo = await reviewDao.getReviewByUserId(userId, limit, offset);
    console.log(reviewInfo)
    return reviewInfo;
}

const likeReview = async(userId, reviewId) => {
    const likesForCheck = await reviewDao.checkLike(userId, reviewId);

    if( !likesForCheck.length ){
        const addedLike = await reviewDao.likeReview(userId, reviewId);
        return addedLike.insertId;
    } else {
        await reviewDao.deleteReviewLike(userId, reviewId);
    }
}

const deleteReviewLike = async(userId, reviewId) => {
    await reviewDao.deleteReviewLike(userId, reviewId);
}

const getReviewLikesByUserId =async(userId, limit, offset) => {
    return reviewDao.getReviewLikesByUserId(userId, limit, offset);
}

module.exports = {
    addReview, 
    getReviewByPlanId, 
    getReviewByUserId, 
    deleteReview, 
    getReviewImage, 
    likeReview,
    deleteReviewLike,
    getReviewLikesByUserId
}