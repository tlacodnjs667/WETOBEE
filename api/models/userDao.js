const { appDataSource } = require("./appDataSource");

const getUserBySocialId = async (kakaoId) => {

	const [user] = await appDataSource.query(
        `
		SELECT 
            kakao_id,
            email,
            nickname,
            profile_image,
            gender
		FROM users
		WHERE kakao_id = ?`,
        [kakaoId]
	)
    return user;
}

const createSignUp = async (kakaoId, email, nickname, profileImage, gender) => {

    return await appDataSource.query(
        `
        INSERT INTO users (
            kakao_id,
            email,
            nickname,
            profile_image,
            gender
          ) VALUES ( ?, ?, ?, ?, ? )
          `,
      [kakaoId, email, nickname, profileImage, gender]
    )
}

module.exports = { 
    getUserBySocialId,
    createSignUp
}