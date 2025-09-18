let users = [{ id: 1, name: "Aziz" }];

export const getUsersFromDB = () => {
    return users;
};

export const addUserToDB = (name) => {
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    return newUser;
};
