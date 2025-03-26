import express from 'express';
import { createOrder, getAllOrders , getOrdersByUser ,getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import auth from '../middlewares/auth.js';
import roleBasedAuth from '../middlewares/roleBasedAuth.js';
import { ROLE_ADMIN } from '../constants/roles.js';

const router = express.Router();

router.get("/", auth , roleBasedAuth(ROLE_ADMIN),getAllOrders);
router.get("/users", auth , getOrdersByUser);
router.get("/:id", auth , getOrderById);
router.put("/:id/status", auth , roleBasedAuth(ROLE_ADMIN), updateOrderStatus);
router.post("/", auth , createOrder);

export default router;