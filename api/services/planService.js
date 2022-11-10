const { planDao } = require("../models");

const insertPlan = async (userId, planData, startDate, endDate) => {
    const mark = planData.marker;
    const plan = await planDao.insertPlan(userId, startDate, endDate);
    const planId = await plan.insertId;

    for(let i = 0; i < mark.length; i++) {
        const longtitude = mark[i].x;
        const latitude = mark[i].y;

        if((36.9644945497 < latitude) && (latitude < 38.2676073455) && (126.2244356697 < longtitude) && (longtitude < 127.7483800375)) {
            const cityId = 1;
            await planDao.insertMarker(planId, cityId, latitude, longtitude);
        }
        else if((35.89079267392 < latitude) && (latitude < 36.96449454976) && (126.2244356697 < latitude) && (latitude < 127.7483800375)) {
            const cityId = 2;
            await planDao.insertMarker(planId, cityId, latitude, longtitude);
        }
        else if((35.5947998606 < latitude) && (latitude< 36.96449454976) && (127.7483800375 < longtitude) && (latitude < 128.9479488383)) {
            const cityId = 3;
            await planDao.insertMarker(planId, cityId, latitude, longtitude);
        }
        else if((34.73496000954 < latitude) && (latitude < 35.5947998606) && (128.509796176 < longtitude) && (latitude < 129.5696245479)) {
            const cityId = 4;
            await planDao.insertMarker(planId, cityId, latitude, longtitude);
        }
        else if((35.5947998606 < latitude) && (latitude < 36.96449454976) && (128.9479488383 < longtitude) && (latitude < 129.5696245479)) {
            const cityId = 5;
            await planDao.insertMarker(planId, cityId, latitude, longtitude);
        }
        else if((36.96449454976 < latitude) && (latitude < 38.2676073455) && (127.7483800375 < longtitude) && (latitude < 129.5696245479)) {
            const cityId = 6;
            await planDao.insertMarker(planId, cityId, latitude, longtitude);
        }
    }
};

const getUserPlan = async (userId) => {
    const plan = await planDao.getUserPlan(userId);
    return plan;
};

const insertSellPlan = (userId, planId) => {
    const plan = planDao.insertSellPlan(userId, planId);
    return plan;
}

const planFilterByState = async (stateId) => {
    const plan = await planDao.planFilterByState(stateId);
    return plan;
};

const getAllPlan = async () => {
    const plan = await planDao.getAllplan();
    return plan;
};

const planFilterByCity = async (cityId) => {
    const plan = await planDao.getFilterByCity(cityId);
    return plan;
}

const deletePlan = async (userId, planId) => {
    const plan = await planDao.deletePlan(userId, planId);
    return plan;
}

const planDetail = async (planId, userId) => {

    const planAuthorCheck = await planDao.checkAuthor(planId, userId);
    const checkOwner = await planDao.checkOwner(planId, userId);

    if(!planAuthorCheck.length && !checkOwner.length){
        const error = new Error('USER_DOES_NOT_HAVE_AUTHORIZATION');
        error.statusCod = 400;
        throw error;        
    }

    const plan = await planDao.planDetail(planId);

    return plan;
    
}


module.exports = {
    insertPlan,
    getAllPlan,
    getUserPlan,
    planFilterByCity,
    planFilterByState,
    deletePlan,
    planDetail,
    insertSellPlan
}



