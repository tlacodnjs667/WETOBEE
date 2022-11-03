const { appDataSource } = require("./appDataSource");

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
  await appDataSource.query(`
    UPDATE plans
    SET sell_count =?
    WHERE id = ?
  `, [planId, countForIncrease]);
};

module.exports = { getPlanInfo, addSellCount };
