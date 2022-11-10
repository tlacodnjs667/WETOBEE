const {orderService} = require("../services");
const {catchAsync} = require("../utils/error");


const addOrder = catchAsync(async (req, res) => {

 const { planId } = req.body;
 const userId = req.body.userId;

 if(!userId || !planId){
    const error = new Error("UNDEFINED_INPUT");
    error.statusCode=404;
    throw error;
   }
   
   const orderId = await orderService.addOrder(userId, planId);
   
   res.status(201).json({message : "ORDER_CREATED", data:orderId});
})

const getOrderInfoByUserId = catchAsync(async (req, res) => {
   const userId = req.userId;
   
   if(!userId) {
      const error = new Error("UNDEFINED_INPUT");
      error.statusCode=404;
      throw error;
   }

   const orderInfoByUserId = await orderService.getOrderInfoByUserId(userId);
   
   res.status(200).json({data : orderInfoByUserId})
})

module.exports = { addOrder, getOrderInfoByUserId };