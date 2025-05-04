const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const { fullName, email, password, vehicle } = req.body;

        const isExistingCaptain = await captainModel.findOne({ email });
        
        if (isExistingCaptain) {
            return res.status(400).json({ message: 'Captain already exist' });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            number: vehicle.number,
            capacity: vehicle.capacity,
            type: vehicle.type
        });

        const token = captain.generateAuthToken();

        return res.status(201).json({ token, captain: {
            email: captain.email,
            fullName: captain.fullName,
            vehicle: captain.vehicle
        } });
    } catch (error) {
        return res.status(400).json({ message: error.message || 'Errow while registering user' });;
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(402).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await captain.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(402).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);

        return res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message || 'Error while loging in captain' });
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captain = await captainModel.findOne({ _id: req.captainId });

        res.status(200).json({ captain });
    } catch (error) {
        return res.status(400).json({ message: 'Error while fetching captain profile details' });
    }
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        const blacklist = await blacklistTokenModel.create({ token });
        
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        res.status(400).json({ message: 'Error while loging out captain' });
    }
}