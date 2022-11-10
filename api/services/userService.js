require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {userDao}  = require('../models');

const signInKakao = async (kakaoToken) => {
    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
    });

    const {data} = result;
    const kakaoId = data.id;
    const nickname = data.properties.nickname;
    const email = data.kakao_account.email;
    const profileImage = data.properties.profile_image;
    const gender = data.kakao_account.gender;
    
    if (!nickname || !email || !kakaoId) throw new error("KEY_ERROR", 400);
    
    const user = await userDao.getUserBySocialId(kakaoId);
    
    if (!user) {
        await userDao.createSignUp(kakaoId, email, nickname, profileImage, gender);
    }

    return jwt.sign({ kakao_id: kakaoId }, process.env.KEY);
    
};

const getUserInfo = async(userId) => {
    const userInfo = await userDao.getUserInfo(userId);
    return userInfo[0];
}

module.exports = {
    getUserInfo,
    signInKakao
}