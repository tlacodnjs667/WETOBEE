const router = require('express').Router();
const { planController }  = require('../controllers');
const { validateToken } = require('../utils/auth');

router.post('/allplan', planController.getAllPlan);
router.post('/sellingplan/:planId', validateToken, planController.insertSellPlan);
router.get('/sellstate/:stateId', planController.planFilterByState);

router.get('/plandetail/:planId', validateToken, planController.planDetail);
router.get('/userplan', validateToken, planController.getUserPlan);
router.get('/cityplan/:cityId', planController.planFilterByCity);

router.post('/insert', validateToken, planController.insertPlan);

router.delete('/plandelete', validateToken, planController.deletePlan);

module.exports = router;