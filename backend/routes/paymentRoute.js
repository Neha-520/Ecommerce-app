const express = require("express");
const Router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentControllers")

Router.route("/payment/process").post(isAuthenticatedUser, processPayment)

Router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey)


module.exports = Router