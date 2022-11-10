const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { userDao } = require("../models");
const { catchAsync } = require("./error");

const validateToken = catchAsync(async(req, res, next) =>{

    const accessToken = req.headers.authorization;
    if( !accessToken ) {
        const error = new Error('UNDEFINED_TOKEN');
        error.statusCode = 404;
        throw error;
    }
    const decoded = await promisify(jwt.verify)(accessToken, process.env.KEY);
    const {kakao_id} = decoded;
    const userId = await userDao.getUserId(kakao_id);
    req.userId = userId;

    next();
})

module.exports = {
    validateToken
}