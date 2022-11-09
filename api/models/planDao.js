const { appDataSource } = require("./appDataSource");

const getAllplan = async () => {
    return await appDataSource.query(
        `
        SELECT
            p.id,
            m.plan_id,
            m.longtitude,
            m.latitude,
            p.start_date,
            p.end_date
        FROM plans p
        inner join markers m on m.plan_id = p.id
        `
    )
}

const insertPlan = async (userId, startDate, endDate) => {
    return await appDataSource.query(
        `
        INSERT INTO plans (
            user_id,
            category_id,
            start_date,
            end_date
          ) VALUES ( ? , ?, ?, ?)`,
        [userId, 1, startDate, endDate]
    )
}

const insertSellPlan = async (userId, planId) => {
    return await appDataSource.query(
        `
        update plans
        set selling_status_id = 2
        where id = ${planId}
        and user_id = ${userId}
        `
    )
}

const insertMarker = async (planId, cityId, latitude, longtitude) => {
    return await appDataSource.query(
    `
    insert into markers(
            plan_id, 
            city_id, 
            latitude,
            longtitude
       ) values (?, ?, ?, ?)`,
    [planId, cityId, latitude, longtitude]
    )
}

const getUserPlan = async(userId) => {
    return await appDataSource.query(
        `
        SELECT
            p.id as planId,
            p.start_date,
            p.end_date,
            u.nickname
        FROM plans p
        inner join users u on u.id = p.user_id
        WHERE user_id = ${userId}
        `
    )
}

const planDetail = async(planId) => {
    return await appDataSource.query(
        `
        SELECT
            p.id as planId,
            m.plan_id,
            m.longtitude,
            m.latitude,
            p.start_date,
            p.end_date
        FROM plans p
        inner join markers m on m.plan_id = p.id
        WHERE p.id = ${planId}
        and m.plan_id = ${planId}
        `
    )
}

const getFilterByCity = async (cityId) => {
    return await appDataSource.query(
        `
        SELECT
            p.id as planId,
            p.start_date,
            p.end_date,
            u.nickname
        FROM plans p
        inner join markers m on m.plan_id = p.id
        inner join users u on u.id = p.user_id
        WHERE m.city_id = ${cityId}
        and p.selling_status_id = 2
        `
    )
}

const planFilterByState = async (stateId) => {
    return await appDataSource.query(
        `
        SELECT
            p.id as planId,
            p.start_date,
            p.end_date
        FROM plans p
        WHERE p.selling_status_id = ${stateId}
        `
    )
}

const deletePlan = async (userId, planId) => {
    return await appDataSource.query(
        `delete from
        plans p
        WHERE p.user_id = ${userId}
        and p.id = ${planId}`
    )
}

const getPlanInfo = async (planId) => {
  const planInfo = appDataSource.query(`
    SELECT
        user_id AS authorId,
        selling_status_id AS sellingStatus,
        plan_price AS price,
        sell_count AS sellCount
    FROM plans
    WHERE id = ?
  `, [planId]);

  return planInfo;
};

const addSellCount = async (planId, countForIncrease) => {
  return await appDataSource.query(`
    UPDATE plans
    SET sell_count =?
    WHERE id = ?
  `, [planId, countForIncrease]);
};

module.exports = { 
  getAllplan,
  insertPlan,
  insertMarker,
  getFilterByCity,
  getUserPlan,
  planFilterByState,
  deletePlan,
  planDetail,
  insertSellPlan,
  getPlanInfo, 
  addSellCount 
};
