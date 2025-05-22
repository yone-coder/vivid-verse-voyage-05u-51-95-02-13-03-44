
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Payment routes
router.post('/create-payment', paymentController.createPayment);
router.get('/status/:id', paymentController.getPaymentStatus);

module.exports = router;
