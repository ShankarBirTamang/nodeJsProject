import express  from "express";
import {createUser ,createMerchant, deleteUser, getAllUser, getAllCustomer, getUserByID, updateUserByID} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";

const router = express.Router();

router.post("/", createUser );
router.post("/merchant",auth,roleBasedAuth(ROLE_ADMIN), createMerchant );
router.get("/",auth, roleBasedAuth(ROLE_MERCHANT),getAllUser);
router.get("/customers",auth, roleBasedAuth(ROLE_MERCHANT),getAllCustomer);
router.get("/:id",auth,getUserByID);
router.put("/:id",auth, roleBasedAuth(ROLE_ADMIN),updateUserByID);
router.delete("/:id",auth, roleBasedAuth(ROLE_ADMIN),deleteUser)
// router.post("/test",auth,(req,res)=>{
//     res.send("Test auth token");
// })

export default router;

