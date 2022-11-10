const { reviewService } = require("../services");
const { catchAsync } = require('../utils/error');

const addReview = catchAsync(async(req, res) => {
    const { planId, comment } = req.body;
    const {userId} = req.userId;
    const imageUrl = await req.file.location;

    if( !planId || !comment || !imageUrl) {
        const error = new Error('UNDEFINED_INPUT');
        error.statusCode=404;
        throw error;
    }
    
    const addedReviewId = await reviewService.addReview(userId, planId, comment, imageUrl);
    res.status(201).json({message : 'REVIEW_CREATED', addedReviewId});
});


const getReviewByPlanId = catchAsync( async(req, res) => {
    const { planId } = req.query;
    const {limit, offset} = req.query;
    
    if(!planId){
        const error = new Error('UNDEFINED_INPUT');
        error.statusCode=400;
        throw error;
    }
    const data = await reviewService.getReviewByPlanId(+planId, +limit, +offset);
    res.status(200).json({message : 'LOADING_SUCCESS', data:data})
})

const getReviewByUserId = catchAsync(async(req, res) => {
    const {limit, offset} = req.query;
    const userId = req.userId;

    if(!userId || !limit || !offset){
        const error = new Error('UNDEFINED_INPUT');
        error.statusCode=400;
        throw error;
    }
    const data = await reviewService.getReviewByUserId(+userId, +limit, +offset);
    res.status(200).json({message : 'LOADING_SUCCESS', data:data})
})

const getReviewImage = catchAsync(async(req, res)=>{
    const {limit, offset} = req.query;
    
    const data = await reviewService.getReviewImage(+limit, +offset);
    
    res.status(200).json({message : 'LOADING_SUCCESS', data:data})
})


const deleteReview = catchAsync(async(req, res)=>{
    const {reviewId}=req.query;
    const userId = req.userId;
    
    if(!reviewId || !userId) {
        const error = new Error('UNDEFINED_INPUT');
        error.statusCode=400;
        throw error;
    }
    
    await reviewService.deleteReview(reviewId, userId);
    res.status(200).json({ message:'DELETE_COMPLETED' });
})

const likeReview = catchAsync(async (req, res)=>{
    const {reviewId} = req.body;
    const userId = await req.userId;

    if(!userId||!reviewId) {
        const error = new Error('UNDEFINED_INPUT');
        error.statusCode = 404;
        throw error;
    }

     const insertId = await reviewService.likeReview(userId, reviewId);
     res.status(200).json({ message : 'FUNCTION_DONE', data: insertId});
})

const deleteReviewLike = catchAsync(async(req, res) => {
    const { reviewId } = req.body;
    const userId = req.userId;  

    if(!reviewId || !userId) {
        const error = new Error('UNDEFINED_INPUT');
        error.statusCode=400;
        throw error;
    }
    
    await reviewService.deleteReviewLike(reviewId, userId);
    
    res.status(204).json({message:'LIKE_DELETED'})
})

const getReviewLikesByUserId = catchAsync(async(req, res)=>{

    const {limit, offset} = req.query;
    const userId = req.userId;
    
    if(!userId){
        const error = new Error('UNDEFINED_USER');
        error.statusCode=400;
        throw error;
    }
    
    const reviewLikeInfo = await reviewService.getReviewLikesByUserId(+userId, +limit, +offset);

    res.status(200).json({message : 'LOADING_SUCCESS', data : reviewLikeInfo });
})

module.exports = {
    addReview, 
    getReviewByPlanId, 
    deleteReview,
    getReviewImage, 
    getReviewByUserId,
    likeReview, 
    deleteReviewLike,
    getReviewLikesByUserId
}