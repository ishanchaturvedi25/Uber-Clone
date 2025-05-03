const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.creeateUser({
        firstName: fullName?.firstName,
        lastName: fullName?.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email }).select('+password');

        if (!user)
            return res.status(401).json({ message: 'Invalid email or password' });
        const isPassword = await user.comparePassword(password);

        if (!isPassword)
            return res.status(401).json({ message: 'Invalid email or password' });
        
        const token = user.generateAuthToken();
        res.status(200).json({ token });
    } catch (err) {
        console.log('Error while loging in: ', err);
        res.status(400).json({ message: err.message || 'Error while loging in' });
    }

}