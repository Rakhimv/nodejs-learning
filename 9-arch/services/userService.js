import { getUsersFromDB, addUserToDB } from "../models/userModel.js";

export const getAllUsers = () => {
    return getUsersFromDB();
};

export const createUser = (name) => {
    return addUserToDB(name);
};
