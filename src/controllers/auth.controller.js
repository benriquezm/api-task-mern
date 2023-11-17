import bcrypt from 'bcryptjs';

import User from '../schemas/user.model.js';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { email, password, username } = req.body;
    //  generate hash for password
    const passwordHash = await bcrypt.hash(password, 10);
    //  save data into db mongo use user model
    //  TO DO validate data request body
    const userToRegister = new User({
        email,
        password: passwordHash,
        username
    });

    try {
        const userSaved = await userToRegister.save();
        const token = await createAccessToken({id: userSaved._id});
        const userResponse = {
            id: userSaved._id,
            email: userSaved.email,
            username: userSaved.username,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        };
        res.cookie('token', token);
        res.status(201).send({ status: 201, message: 'OK', data: userResponse});
    } catch (error) {
        res.status(500).send({ status: 500, message: 'FAILED', data: { error: error } })
    }
};

export const login = (req, res) => res.send('login');