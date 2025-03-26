import formatUserData from "../helpers/dataFormatter.js";
import userService from "../services/userService.js";
import { ROLE_MERCHANT ,ROLE_ADMIN } from "../constants/roles.js";

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const createMerchant = async (req, res) => {
    try {
        const user = await userService.createMerchant(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        const formattedUser = users.map((user)=>formatUserData(user))
        res.json(formattedUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
}

const getAllCustomer = async (req, res) => {
    try {
        const users = await userService.getAllCustomer();
        const formattedUser = users.map((user)=>formatUserData(user))
        res.json(formattedUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
}

const getUserByID = async (req, res) => {
    const id = req.params.id;
    const loggedInUser = req.user;
    
    try {
        const user = await userService.getUserByID(id);
    
        if (!user) return res.status(404).send("User not found.");
    
        if (loggedInUser.id != user.id && !user.role.includes(ROLE_MERCHANT)){
        return res.status(403).send("Access denied");
        }
    
        res.json(formatUserData(user));
    } catch (error) {
        res.status(500).send(error.message);
    }
    };

const updateUserByID = async ( req, res) =>{
    const id = req.params.id;
    try {
        const user = await userService.updateUser(id, req.body ,);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.send(`"User Deleted Successfully of id: ${id}"`);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const uploadProfileImage = (req,res)=>{
    res.send("Uploaded...");
}

export  {createUser, createMerchant,getAllUser ,getAllCustomer, getUserByID ,updateUserByID ,uploadProfileImage, deleteUser};