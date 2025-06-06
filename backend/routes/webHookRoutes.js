const express = require('express')
const verifySignatureMiddleware = require('../middlewares/verifySignature')
const handleWebhook = require('../controllers/webHookController')

const router = express.Router()

router.route('/webhook/capture').post(verifySignatureMiddleware,handleWebhook);

module.exports= router