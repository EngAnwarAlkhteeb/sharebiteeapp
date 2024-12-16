import express from 'express'
import authMiddleware from '../maddleware/auth.js'
import { placeOrder, verfiyOrder, userOrders, updateStatus } from '../controllers/orderController.js'

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware,placeOrder);
orderRoute.post("/verify", verfiyOrder)
orderRoute.post("/userorders", authMiddleware, userOrders )
orderRoute.post("/status", updateStatus)

export default orderRoute;