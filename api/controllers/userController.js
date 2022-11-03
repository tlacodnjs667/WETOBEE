const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const signInKakao = catchAsync(async (req, res) => {
    const code = req.query.code;
    
    if(!code){
        const error =  new Error("CODE_DOESN'T_EXIST");
        error.statusCode = 400;
        throw error;
    }

    const accessToken = await userService.signInKakao(code);

     return res.status(201).json({ accessToken });

})

module.exports = {
    signInKakao
}