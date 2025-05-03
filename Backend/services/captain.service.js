const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstName, lastName, email, password, color, number, capacity, type
}) => {
    try {
        if (!firstName || !email || !password || !color || !number || !capacity || !type) {
            throw new Error('All fields are required');
        }

        const captain = await captainModel.create({
            fullName: { firstName, lastName },
            email,
            password,
            vehicle: {
                color,
                number,
                capacity,
                type
            }
        });

        return captain;

    } catch (error) {
        throw new Error('Error while registering captain');
    }
}