const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signInKakao = catchAsync (async (req, res) => {

    const kakaoToken = req.headers.authorization;

    if ( !kakaoToken ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    const accessToken = await userService.signInKakao(kakaoToken);
    
return res.status(200).json({ accessToken: accessToken });
});

const getUserInfo= async(req, res) => {
    const userId = req.userId;

    const userInfo = await userService.getUserInfo(userId);

    res.status(200).json({message:'LOADING_SUCCESS', data:userInfo});
}

module.exports = {
    getUserInfo,
    signInKakao
}