const express = require('express');
const verifySignatureMiddleware = require('../middlewares/verifySignature');
const { createOrder, storeTransaction, checkTransaction, getAllTransactions } = require('../controllers/paymentsController');
const { verifiyTransaction } = require('../middlewares/verifyTransaction');
const { verifyToken } = require('../middlewares/authenticate');
const router = express.Router();



router.route('/payment/create-order').post(createOrder);
router.route('/payment/store-transaction').post(verifiyTransaction,storeTransaction)
router.route('/payment/verify-transaction').post(verifiyTransaction,checkTransaction);
router.route('/payment/get-transaction').get(verifyToken,getAllTransactions);
router.route('/payment/get-transactions/:user_id').get(verifyToken,getAllTransactions);

module.exports = router;
