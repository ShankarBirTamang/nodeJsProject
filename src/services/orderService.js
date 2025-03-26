import Order from '../models/Order.js'
import { ORDER_STATUS_PENDING } from '../constants/orderStatus.js';

const getAllOrders = async (query) => {
    return await Order.find({
        status: query.status || ORDER_STATUS_PENDING,
      })
        .sort({ createdAt: -1 })
        .populate("orderItems.product")
        .populate("user", ["name", "email", "phone", "address"]);
}

const createOrder = async (data) => {
    data.orderNumber = crypto.randomUUID();
    console.log("Data from create order service: ",data);
    return await Order.create(data);
  };

  const getOrdersByUser = async (userId,query) => {
    return await Order.find({
      user: userId,
      status: query.status || ORDER_STATUS_PENDING,
    })
      .sort({ createdAt: -1 })
      .populate("orderItems.product")
      .populate("user", ["name", "email", "phone", "address"]);
  };

const getOrderById = async (id) => {
    const order = await Order.findById(id)
      .populate("orderItems.product")
      .populate("user", ["name", "email", "phone", "address"]);
  
    if (!order) {
      throw {
        statusCode: 404,
        message: "Order not found.",
      };
    }
  
    return order;
  };

  const updateOrderStatus = async (id, status) => {
    return await Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true,runValidators:true }
    );
  };


export default {getAllOrders , createOrder , getOrdersByUser , getOrderById , updateOrderStatus};