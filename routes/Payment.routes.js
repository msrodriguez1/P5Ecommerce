const express = require("express")
const {createPayment, pendingPayment, successPayment, failurePayment} = require('../controllers/Payment.controller')
const router = express.Router()

router.get('/', (req,res)=>{
res.json({
    message:'ruta payment'

})})

router.post('/create-payment', createPayment)
router.post('/success-payment', successPayment)
router.post('/pending-payment', pendingPayment)
router.post('/failure-payment', failurePayment)

module.exports=router