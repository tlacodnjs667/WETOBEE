const { userDao } = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const signInKakao = async (code) => {

    const clientId = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;

    const getToken = await axios({
        url:`https://kauth.kakao.com/oauth/token`,
        method: 'POST',
        headers:{ 
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data : `grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirect_uri}&code=${code}`
    });

    const userData = await axios({
        url:`https://kapi.kakao.com/v2/user/me`,
        method: 'GET',
        headers:{
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        "Authorization" : `Bearer ${getToken.data.access_token}`
        }
    });

    const kakaoUser = userData.data;
    
    const kakaoId =  kakaoUser.id;
    const email = kakaoUser.kakao_account.email;
    const nickname = kakaoUser.properties.nickname;
    const profileImage = kakaoUser.kakao_account.profile.profile_image_url;
    const gender = kakaoUser.kakao_account.profile.gender;

	let user = await userDao.getUserBySocialId(kakaoId);
    
    if(!user){
        await userDao.createSignUp(kakaoId, email, nickname, profileImage, gender);
        user = await userDao.getUserBySocialId(kakaoId);
    }

	const accessToken = jwt.sign({ user_id : user.id }, process.env.KEY)

	return accessToken

}

module.exports = { 
    signInKakao
}






