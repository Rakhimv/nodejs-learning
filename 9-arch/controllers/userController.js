import { getAllUsers, createUser } from "../services/usersService.js";

export const getUsers = (req, res) => {
    const users = getAllUsers();
    res.json(users);
};

export const addUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newUser = createUser(name);
    res.status(201).json(newUser);
};
