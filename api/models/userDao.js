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

const getUserInfo = async(userId) => {
    return await appDataSource.query(`
        SELECT
            profile_image AS profileImage,
            nickname,
            floor(point) as point
        FROM users
        WHERE id = ? ; 
    `,[userId])
}

const getUserPoint = async(userId) => {
    const userPointInfo = await appDataSource.query(`
        SELECT 
            point
        FROM users
        WHERE id = ?
    `, [userId])

    return userPointInfo[0].point;
}

module.exports = { 
    getUserBySocialId,
    createSignUp,
    getUserInfo,
    getUserPoint
}