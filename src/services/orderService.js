import Order from '../models/Order.js'

const getAllOrders = async (query) => {
    const filter = {};

    if(query.status) filter.status = query.status || "pending";

    return await Order.find()
        .sort({createdAt : -1})
        .populate("orderItems.product")
        .populate("user",["name","email","phone","address"])
}

const createOrder = async(data) => {
    return await Order.create(data)
        .populate("orderItems.product")
        .populate("user",["name","email","phone","address"])
}

const getOrderByUser = async (userId) => {
    return await Order.find({user:userId})
        .populate("orderItems.product")
        .populate("user",["name","email","phone","address"])
}

const getOrderById = async (id) => {
    const order = await Order.findById(id)
        .populate("orderItems.product")
        .populate("user",["name","email","phone","address"]);
    

    return order;
}
export default {getAllOrders , createOrder , getOrderByUser , getOrderById};