const userModel = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.creeateUser = async ({
    firstName, lastName, email, password
}) => {
    if(!firstName || !email || !password) {
        throw new Error('All fields are required');
    }

    try {
        const user = await userModel.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password
        })

        return user;
    } catch (error) {
        throw new Error(error.message || 'Error while creating user');
    }
}