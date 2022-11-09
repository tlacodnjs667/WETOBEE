const {orderDao, planDao, userDao} = require('../models');

const addOrder = async(userId, planId) => {
    
    const checkPlan = await planDao.getPlanInfo(planId);

    if(!checkPlan.length){
        const error = new Error('CANNOT_FIND_APPROPRIATE_PLAN');
        error.statusCode=400;
        throw error;
    }
    
    if(checkPlan[0].authorId == userId){
        const error = new Error('CANNOT_ORDER_OWN_PLAN');
        error.statusCode=400;
        throw error;
    };

    if(checkPlan[0].sellingStatus===2){
        const error = new Error('NOT_FOR_SALE');
        error.statusCode=400;
        throw error;
    }
    
    const userPoint = await userDao.getUserPoint(userId);
    
    if(userPoint < checkPlan[0].price){
        const error = new Error('YOUR_POINT_ISNT_ENOUGH');
        error.statusCode=400;
        throw error;
    }
    
    const checkOrder = await orderDao.checkOrder(userId, planId);
    
    if(checkOrder.length){
        const error = new Error('DUPLICATE_ORDER_REQUIRE');
        error.statusCode=400;
        throw error;
    }
    
    const addedOrder = await orderDao.addOrder(userId, planId);

    return addedOrder.insertId;

}

const getOrderInfoByUserId = async(userId) => {
    return orderDao.getOrderInfoByUserId(userId);
}   

module.exports = {addOrder, getOrderInfoByUserId};