const { planService } = require("../services");
const { catchAsync } = require("../utils/error");

const insertPlan = catchAsync(async (req, res) => {

    const userId = req.userId;
    const planData = req.body;
    const { startDate, endDate }= req.body;

    if ( !userId || !planData || !startDate || !endDate) {
        return res.status(400).json({ message: "key does not exist" });
      }

    const plan = await planService.insertPlan(userId, planData, startDate, endDate);

    return res.status(201).json({ plan });

});

const getUserPlan = catchAsync(async (req, res) => {

        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "key does not exist" });
        }

        const plan = await planService.getUserPlan(userId);
    
        return res.status(201).json({ plan });

});

const getAllPlan = catchAsync(async (req, res) => {

    const plan = await planService.getAllPlan();
    for(let i = 0; i < plan.length; i++) {
        plan[i]['data'] = {
            circle: [],
            ellipse: [],
            marker: [],
            polyline: [],
            rectangle: [],
            polygon: []
        }

        plan[i]['data'].marker.push({
            type: 'marker',
            coordinate: 'wgs84',
            x: plan[i].longtitude,
            y: plan[i].latitude,
            zIndex: 0,
            content: ''
        })
    }
    return res.status(201).json({ plan });

});

const planFilterByCity = catchAsync(async (req, res) => {

    const {cityId} = req.params;

    if (!cityId) {
        return res.status(400).json({ message: "key does not exist" });
    }

    const plan = await planService.planFilterByCity(+cityId);

    return res.status(201).json({ plan });

});

const planFilterByState = catchAsync(async (req, res) => {

    const {stateId} = req.params;

    if (!stateId) {
        return res.status(400).json({ message: "key does not exist" });
    }

    const plan = await planService.planFilterByState(stateId);

    return res.status(201).json({ plan });

});

const deletePlan = catchAsync(async (req, res) => {

    const userId = req.userId;
    const {planId} = req.params;

    if (!userId || !planId) {
        return res.status(400).json({ message: "key does not exist" });
    }

    const plan = await planService.deletePlan(userId, planId);

    return res.status(201).json({ 'plan delete success': true, plan });
 
});

const planDetail = catchAsync(async (req, res) => {

    const {planId} = req.params;
    const userId = req.userId;

    if (!planId) {
        return res.status(400).json({ message: "UNDEFINED_INPUT" });
    }
    console.log(userId)
    const plan = await planService.planDetail(+planId, userId);

    for(let i = 0; i < plan.length; i++) {
        plan[i]['data'] = {
            circle: [],
            ellipse: [],
            marker: [],
            polyline: [],
            rectangle: [],
            polygon: []
        }

        plan[i]['data'].marker.push({
            type: 'marker',
            coordinate: 'wgs84',
            x: plan[i].longtitude,
            y: plan[i].latitude,
            zIndex: 0,
            content: ''
        })
    }
    return res.status(201).json({ plan });

});

const insertSellPlan = catchAsync(async (req, res) => {

    const userId = req.userId;
    const planId = req.params.planId;

    if (!userId || !planId) {
        return res.status(400).json({ message: "key does not exist"});
    }

    const plan = await planService.insertSellPlan(userId, +planId);

    return res.status(201).json({ 'plan selling success': true, plan });

});
    

module.exports = {
    getAllPlan,
    insertPlan,
    getUserPlan,
    planFilterByCity,
    planFilterByState,
    deletePlan,
    planDetail,
    insertSellPlan
}