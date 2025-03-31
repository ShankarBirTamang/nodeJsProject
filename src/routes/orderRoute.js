import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  checkoutOrder,
  confirmOrder,
} from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", auth, roleBasedAuth(ROLE_ADMIN), getAllOrders);
router.get("/users/:userId", auth, getOrdersByUser);
router.get("/:id", auth, getOrderById);
router.put("/:id/status", auth, roleBasedAuth(ROLE_ADMIN), updateOrderStatus);
router.put("/:id/checkout", auth, checkoutOrder);
router.put("/:id/confirm", auth, confirmOrder);
router.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), deleteOrder);
router.post("/", auth, createOrder);

export default router;
