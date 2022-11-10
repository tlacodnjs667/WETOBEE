const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const validateToken = async(req, res, next) =>{
    const accessToken = req.header("authorization");

    if( !accessToken ) return res.status(400).json({message : "KEY_ERROR" });
    const decoded = await promisify(jwt.verify)(accessToken, process.env.JWT_SECRET);
    const {user_id} = decoded;
    req.userId = user_id;

    return next();
}

module.exports = {
    validateToken
}