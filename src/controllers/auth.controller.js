import User from '../schemas/user.model.js';

export const register = (req, res) => {
    //  save data into db mongo use user model
    //  TO DO validate data request body
    const userToRegister = new User(req.body);
    try {
        userToRegister.save();
        res.status(201).send({ status: 201, message: 'OK', data: userToRegister});
    } catch (error) {
        res.status(500).send({ status: 500, message: 'FAILED', data: { error: error } })
    }
};

export const login = (req, res) => res.send('login');