import Order from "../models/Order.js";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
} from "../constants/orderStatus.js";
import payViaKhalti from "../utils/khalti.js";
import paymentService from "../services/paymentService.js";

const getAllOrders = async (query) => {
  return await Order.find({
    status: query.status || ORDER_STATUS_PENDING,
  })
    .sort({ createdAt: -1 })
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"]);
};

const createOrder = async (data) => {
  data.orderNumber = crypto.randomUUID();
  console.log("Data from create order service: ", data);
  return await Order.create(data);
};

const getOrdersByUser = async (userId, query) => {
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
    { new: true, runValidators: true }
  );
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndUpdate(id);
};

// Initiate payment
const checkoutOrder = async (id, data) => {
  console.log("data in service: ", data.returnUrl);
  const order = await Order.findById(id).populate("user", [
    "name",
    "email",
    "phone",
  ]);

  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found.",
    };
  }

  //initiate khalti payment
  return await payViaKhalti({
    returnUrl: data.returnUrl,
    websiteUrl: data.websiteUrl,
    amount: order.totalPrice,
    orderId: order.id,
    orderName: order.orderNumber,
    customerInfo: order.user,
  });
};

const confirmOrder = async (id, data) => {
  const order = await Order.findById(id);

  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found.",
    };
  }

  const isPaymentSuccess = data.status == "completed";

  await paymentService.createPayment({
    amount: order.totalPrice,
    paymentMethod: data.paymentMethod || "online",
    status: isPaymentSuccess ? "completed" : "failed",
    order: id,
    transactionId: data.transactionId,
  });

  if (!isPaymentSuccess) {
    throw {
      statusCode: 400,
      message: "Payment failed",
    };
  }

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED },
    { new: true }
  );
};

export default {
  getAllOrders,
  confirmOrder,
  createOrder,
  checkoutOrder,
  getOrdersByUser,
  getOrderById,
  deleteOrder,
  updateOrderStatus,
};
