import userService from "../services/userService.js";

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        res.json(users);
        } catch (error) {
            res.status(500).send(error.message);
            }
        }

export  {createUser, getAllUser};