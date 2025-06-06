const Razorpay = require("razorpay");
const razorpayInstance = require("../utils/razorpay");
const { nanoid } = require("nanoid");
const Transactions = require("../models/transactions");
const donations = require("../models/donations");
const user = require("../models/user");
const e = require("express");

const createOrder = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;
  try {
    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: receipt || `rcpt_${nanoid(32)}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({
      message: "Success",
      order: order,
      success: true,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "Failed to create order", order: [], success: false });
  }
};

const storeTransaction = async (req, res) => {
  //console.log(req.body);
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      status,
      user_id,
      donation_id,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !amount ||
      !currency
    ) {
      return res.status(400).json({
        message: "Missing required transaction fields.",
        success: false,
      });
    }

    const transactionData = new Transactions({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      amount,
      currency,
      status,
      createdAt: new Date(),
    });
    await transactionData.save();

    const donation = await donations.findById(donation_id);
    if (!donation) {
      return res
        .status(404)
        .json({ message: "Donation not found", success: false });
    }
    donation.donors.push(user_id);
    await donation.save();

    const userDoc = await user.findById(user_id);
    if (!userDoc) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    userDoc.transactions.push(transactionData._id);
    await userDoc.save();

    return res.status(200).json({
      message: "Payment verification success",
      success: true,
      transactionId: transactionData._id,
    });
  } catch (error) {
    console.error("Transaction store error:", error.message);
    return res.status(200).json({
      message: "Internal server error while storing transaction",
      success: false,
    });
  }
};

const checkTransaction = async (req, res) => {
  const { donation_id, user_id, razorpay_order_id } = req.body;

  const userDoc = await user.findById(user_id);
  const donationDoc = await donations.findById(donation_id);
  const paymentDoc = await Transactions.findOne({ orderId: razorpay_order_id });

  if (
    !userDoc.transactions.includes(paymentDoc._id) ||
    !donationDoc.donors.includes(userDoc._id)
  ) {
    return res.status(200).json({
      message: "Invalid Details Provided",
      success: false,
    });
  } else {
    return res.status(200).json({
      message: "Verified Successfully",
      success: true,
    });
  }
};


const getAllTransactions = async (req, res) => {
    const {user_id}= req.params;
  if(user_id){
    try {
    const transaction = await user.findById(user_id).populate("transactions");
    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
        success: false,
      });
    }
    else{ 
          return res.status(200).json({
            message: "Transaction fetched successfully",
            success: true,
            transaction,
          });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      message: "Failed to fetch transactions",
      success: false,
    });
  }
  }
  else if(req.user.role==="admin"){
    try {
      const transaction = await Transactions.find().populate("donations");
      if (!transaction) {
        return res.status(404).json({
          message: "Transaction not found",
          success: false,
        });
      }
      else{ 
            return res.status(200).json({
              message: "Transaction fetched successfully",
              success: true,
              transaction,
            });
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({
        message: "Failed to fetch transactions",
        success: false,
      });
    }
  }
  else{
    return res.status(403).json({
      message: "You are not authorized to view this data",
      success: false,
    });
  }
};

module.exports = { createOrder, storeTransaction, checkTransaction,getAllTransactions };
