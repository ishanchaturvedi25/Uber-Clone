const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
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

        return res.status(201).json({ token, captain });
    } catch (error) {
        return res.status(400).json({ message: error.message || 'Errow while registering user' });;
    }
}