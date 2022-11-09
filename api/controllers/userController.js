const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signInKakao = catchAsync (async (req, res) => {

    const kakaoToken = req.headers.authorization;
    console.log(kakaoToken)

    if ( !kakaoToken ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    const accessToken = await userService.signInKakao(kakaoToken);
    
return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
    signInKakao
}