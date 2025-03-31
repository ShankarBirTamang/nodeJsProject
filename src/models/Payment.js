import mongoose from "mongoose";
import {
  PAYMENT_METHOD_CARD,PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,PAYMENT_STATUS_COMPLETED,
  PAYMENT_STATUS_PENDING, PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_REFUNDED
} from "../constants/paymentStatus.js";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: [PAYMENT_METHOD_CARD, PAYMENT_METHOD_CASH, PAYMENT_METHOD_ONLINE],
        required: true,
      },
      status: {
        type: String,
        enum: [PAYMENT_STATUS_PENDING, PAYMENT_STATUS_COMPLETED, PAYMENT_STATUS_FAILED, PAYMENT_STATUS_REFUNDED],
        default: PAYMENT_STATUS_PENDING,
      },
      createdAt:{
        type:Date,
        default:Date.now()
      },
      order : {
        type: mongoose.Types.ObjectId,
        ref:"Order",
        required:true,
      },
      transactionId: String,

});

const model = mongoose.model("Payment", paymentSchema);

export default model;