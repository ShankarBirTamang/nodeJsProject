import express from 'express';
import { createOrder, getAllOrders , getOrderByUser ,getOrderById } from '../controllers/orderController.js';
import auth from '../middlewares/auth.js';
import roleBasedAuth from '../middlewares/roleBasedAuth.js';
import { ROLE_ADMIN } from '../constants/roles.js';

const router = express.Router();

router.get("/", auth , roleBasedAuth(ROLE_ADMIN),getAllOrders)
router.get("/users", auth , getOrderByUser)
router.get("/:id", auth , getOrderById)
router.post("/", auth , createOrder)

export default router;