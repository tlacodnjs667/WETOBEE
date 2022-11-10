const { appDataSource } = require("./appDataSource");

const addReview = async(userId, planId, DEFAULT_CATEGORY_ID, content, imageUrl) => {
    const addedReviewId = await appDataSource.query(`
        INSERT INTO reviews (
            user_id,
            plan_id,
            category_id,
            content,
            thumbnail
        ) VALUES (?, ?, ?, ?, ?);
    `, [userId, planId, DEFAULT_CATEGORY_ID, content, imageUrl]);

    return addedReviewId;
}

const getReviewImage = async(limit, offset) => {
    const reviewImages = await appDataSource.query(`
        SELECT
            r.id AS reviewId,
            thumbnail,
            plan_id AS planId
        FROM reviews r
        LEFT JOIN review_likes rl ON rl.review_id = r.id
        GROUP BY r.id
        ORDER BY COUNT(rl.review_id) DESC, reviewId
        LIMIT ? OFFSET ?
    `, [limit, offset])
    return reviewImages;
}

const getReviewByPlanId = async(planId, limit, offset) => {
    return appDataSource.query(`
        SELECT
            r.id AS reviewId,
            nickname,
            thumbnail,
            content
        FROM reviews r
        JOIN users u ON u.id = r.user_id
        WHERE r.plan_id = ?
        ORDER BY r.id DESC
        LIMIT ? OFFSET ?
    `, [planId, limit, offset]);
}

const getReviewByUserId = async(userId, limit, offset) => {
    return appDataSource.query(`
    SELECT
        plan_id AS planId,
        r.id AS reviewId,
        content,
        thumbnail,
        date_format(r.created_at, '%Y년 %m월 %d일 %H시 %i분') AS createdDay,
        COUNT(rl.id) AS likeCount
    FROM reviews r
    LEFT JOIN review_likes rl ON r.id = rl.review_id
    WHERE r.user_id = ?
    GROUP BY r.id
    LIMIT ? OFFSET ?
    `, [userId, limit, offset])
}

const checkReview = async(reviewId, userId) => {
    return appDataSource.query(`
    SELECT
        id
    FROM reviews
    WHERE user_id=? and id=?
    `, [userId, reviewId]);
}
const checkDuplication = async( userId, planId ) => {
    return appDataSource.query(`
    SELECT
        id,
        plan_id AS planId
    FROM reviews
    WHERE user_id=? and plan_id=?
    `, [userId, planId]);
}

const deleteReview = async(reviewId) => {
    await appDataSource.query(`
        DELETE
        FROM reviews
        WHERE id=?
    `, [reviewId]);
}

const checkLike = async(userId, reviewId) => {
    return appDataSource.query(`
        SELECT 
            id
        FROM review_likes
        WHERE user_id = ? and review_id = ? 
    `, [userId, reviewId]);
}

const likeReview = async(userId, reviewId) => {
    return await appDataSource.query(`
        INSERT INTO review_likes (
            user_id,
            review_id
        ) VALUES ( ?, ? );
    `, [userId, reviewId]);
}

const deleteReviewLike = async(userId, reviewId) => {
    await appDataSource.query(`
        DELETE
        FROM review_likes
        WHERE user_id = ? and review_id = ? 
    `, [userId, reviewId]);
}

const getReviewLikesByUserId = async(userId, limit, offset) => {
    return appDataSource.query(`
        SELECT
            review_id as reviewId,
            plan_id as planId,
            content,
            thumbnail
        FROM review_likes rl
        JOIN reviews r ON rl.review_id = r.id
        WHERE rl.user_id = ?
        LIMIT ? OFFSET ?
    `, [userId, limit, offset]);
}

module.exports = { 
    addReview, 
    getReviewByPlanId, 
    getReviewByUserId, 
    checkReview, 
    deleteReview, 
    getReviewImage, 
    checkDuplication, 
    likeReview, 
    checkLike, 
    deleteReviewLike,
    getReviewLikesByUserId
};