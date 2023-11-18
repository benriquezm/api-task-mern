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

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if(!userFound) return res.status(404).send({ status: 404, message: 'User not found.', data: {} });
        //  compare password into db save
        const isValidPassword = await bcrypt.compare(password, userFound.password);
        if(!isValidPassword) return res.status(401).send({ status: 401, message: 'No credentials provided or credentials are invalid.', data: {} });
        const token = await createAccessToken({id: userFound._id});
        const userResponse = {
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        };
        res.cookie('token', token);
        res.status(201).send({ status: 201, message: 'OK', data: userResponse});
    } catch (error) {
        res.status(500).send({ status: 500, message: 'FAILED', data: { error: error } })
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.status(200).send({ status: 200, message: 'session ended successfully.', data: {}});
};
