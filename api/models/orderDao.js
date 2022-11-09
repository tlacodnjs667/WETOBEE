const { appDataSource } = require("../models/appDataSource");
const planDao = require('./planDao');
const userDao = require("./userDao");
const ORDER_STATUS = require('../utils/orderStatusEnum');

const checkOrder = async (userId, planId) => {
  const checkSameOrder = await appDataSource.query(`
        SELECT 
            id
        FROM orders
        WHERE user_id = ? and plan_id = ?
    `, [userId, planId]);

  return checkSameOrder;
};

const addOrder = async (userId, planId) => {
  const queryRunner = appDataSource.createQueryRunner();
  
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const checkPlan = await planDao.getPlanInfo(planId);

    const userPoint = await userDao.getUserPoint(userId);

    const pointForChange = userPoint - checkPlan[0].price;

    const addedOrder = await queryRunner.query(`
        INSERT INTO orders(
            user_id,
            plan_id,
            order_status_id
        ) VALUES (?,?,?);
    `, [userId, planId, ORDER_STATUS.BEFORE_PAYMENT]);

    await queryRunner.query(`
        UPDATE users
        SET point=?
        WHERE id=?
    `, [pointForChange, userId]);

    await queryRunner.query(`
        UPDATE orders
        SET order_status_id = ?
        WHERE id = ?
    `, [ORDER_STATUS.PAID, addedOrder.insertId]);

    const countForIncrease = checkPlan[0].sellCount + 1;

    await queryRunner.query(`
      UPDATE plans
      SET sell_count = ?
      WHERE id = ?
    `, [countForIncrease, planId]);

    await queryRunner.commitTransaction();
    return addedOrder;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

const getOrderInfoByUserId = async(userId) =>{
  const data = await appDataSource.query(`
    SELECT
      o.id AS orderId,
      os.name AS orderStatus,
      plan_price,
      o.plan_id AS planId
    FROM orders o
    JOIN order_status os ON os.id = o.order_status_id
    JOIN plans p ON o.plan_id = p.id
    WHERE o.user_id = ?
  `, [userId]);

  return data;
}

module.exports = {
  addOrder,
  checkOrder,
  getOrderInfoByUserId
};
