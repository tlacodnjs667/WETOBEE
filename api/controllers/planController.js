const { planService } = require("../services");
const { catchAsync } = require("../utils/error");

const insertPlan = catchAsync(async (req, res) => {
    try {
    const userId = req.userId.id;
    const planData = req.body;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    if (!userId || !planData || !startDate || !endDate) {
        return res.status(400).json({ message: "key does not exist" });
      }

    const plan = await planService.insertPlan(userId, planData, startDate, endDate);

    return res.status(201).json({ plan });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});

const getUserPlan = catchAsync(async (req, res) => {
    try {
        const userId = req.userId.id;

        if (!userId) {
            return res.status(400).json({ message: "key does not exist" });
        }

        const plan = await planService.getUserPlan(userId);
    
        return res.status(201).json({ plan });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});

const getAllPlan = catchAsync(async (req, res) => {
    try{
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
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});

const planFilterByCity = catchAsync(async (req, res) => {
   try{
    const {cityId} = req.params;

    if (!cityId) {
        return res.status(400).json({ message: "key does not exist" });
    }

    const plan = await planService.planFilterByCity(cityId);

    return res.status(201).json({ plan });

} catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
}
});

const planFilterByState = catchAsync(async (req, res) => {
   try{
    const {stateId} = req.params;

    if (!stateId) {
        return res.status(400).json({ message: "key does not exist" });
    }

    const plan = await planService.planFilterByState(stateId);

    return res.status(201).json({ plan });
    } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
    }
});

const deletePlan = catchAsync(async (req, res) => {
    try{
    const userId = req.userId.id;
    const {planId} = req.params;

    if (!userId || !planId) {
        return res.status(400).json({ message: "key does not exist" });
    }
    if (planId !== Number) {
        return res.status(400).json({ message: "KEY_ERROR" });
    }

    const plan = await planService.deletePlan(userId, planId);

    return res.status(201).json({ 'plan delete success': true, plan });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});

const planDetail = catchAsync(async (req, res) => {
    try{
    const {planId} = req.params;

    if (!planId) {
        return res.status(400).json({ message: "key does not exist" });
    }
    if (planId !== Number) {
        return res.status(400).json({ message: "KEY_ERROR" });
    }
    const plan = await planService.planDetail(planId);

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
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
});

const insertSellPlan = catchAsync(async (req, res) => {
    try{
    const userId = req.userId.id;
    const planId = req.params.planId;

    if (!userId || !planId) {
        return res.status(400).json({ message: "key does not exist"});
    }

    if (planId !== Number) {
        return res.status(400).json({ message: "KEY_ERROR" });
    }

    const plan = await planService.insertSellPlan(userId, planId);

    return res.status(201).json({ 'plan selling success': true, plan });
    }
    catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
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