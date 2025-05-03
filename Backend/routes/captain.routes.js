const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');


router.post('/register', [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be atleast 3 characters long'),
    body('vehicle.number').isLength({ min: 3 }).withMessage('Vehicle number must be atleast 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be atleast 1'),
    body('vehicle.type').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], captainController.register);


module.exports = router;