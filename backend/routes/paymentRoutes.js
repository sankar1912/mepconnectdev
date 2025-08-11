const express = require('express');
const verifySignatureMiddleware = require('../middlewares/verifySignature');
const { createOrder, storeTransaction, checkTransaction, getAllTransactions } = require('../controllers/paymentsController');
const { verifiyTransaction } = require('../middlewares/verifyTransaction');
const { verifyToken } = require('../middlewares/authenticate');
const router = express.Router();



router.route('/razorpay/payment/create-order').post(createOrder);
router.route('/razorpay/payment/store-transaction').post(verifiyTransaction,storeTransaction)
router.route('/razorpay/payment/verify-transaction').post(verifiyTransaction,checkTransaction);
router.route('/razorpay/payment/get-transaction').get(verifyToken,getAllTransactions);
router.route('/razorpay/payment/get-transactions/:user_id').get(verifyToken,getAllTransactions);

module.exports = router;
