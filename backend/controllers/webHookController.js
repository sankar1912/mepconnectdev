const crypto = require("crypto");
const handleWebhook = (req, res) => {
    const { event, payload } = req.body;

    console.log("Received Razorpay Webhook:", event);

    switch (event) {
        case "payment.authorized":
            console.log("Payment Authorized:", payload.payment);
            break;
        case "payment.failed":
            console.log("Payment Failed:", payload.payment);
            break;

        case "payment.captured":
            console.log("Payment Captured:", payload.payment);
            break;

        case "payment.dispute.created":
            console.log("Payment Dispute Created:", payload.dispute);
            break;

        case "payment.dispute.won":
            console.log("Payment Dispute Won:", payload.dispute);
        
            break;

        case "payment.dispute.lost":
            console.log("Payment Dispute Lost:", payload.dispute);
            
            break;

        case "payment.dispute.closed":
            console.log("Payment Dispute Closed:", payload.dispute);
            break;

        case "payment.dispute.under_review":
            console.log("Payment Dispute Under Review:", payload.dispute);
            break;

        case "payment.dispute.action_required":
            console.log("Payment Dispute Action Required:", payload.dispute);
            break;

        case "payment.downtime.started":
            console.log("Payment Downtime Started:", payload.downtime);
            break;

        case "payment.downtime.updated":
            console.log("Payment Downtime Updated:", payload.downtime);
            break;

        case "payment.downtime.resolved":
            console.log("Payment Downtime Resolved:", payload.downtime);
            break;

//orders
        case "order.paid":
            console.log("Order Paid:", payload.order);
            break;

        case "order.notification.delivered":
            console.log("Order Notification Delivered:", payload.notification);
            break;

        case "order.notification.failed":
            console.log("Order Notification Failed:", payload.notification);
            break;
        case "invoice.paid":
            console.log("Invoice Paid:", payload.invoice);
            break;

        case "invoice.partially_paid":
            console.log("Invoice Partially Paid:", payload.invoice);
            break;

        case "invoice.expired":
            console.log("Invoice Expired:", payload.invoice);
            break;
        case "subscription.authenticated":
            console.log("Subscription Authenticated:", payload.subscription);
            break;

        case "subscription.paused":
            console.log("Subscription Paused:", payload.subscription);
            break;

        case "subscription.resumed":
            console.log("Subscription Resumed:", payload.subscription);
            break;

        case "subscription.activated":
            console.log("Subscription Activated:", payload.subscription);
            break;

        case "subscription.pending":
            console.log("Subscription Pending:", payload.subscription);
            break;

        case "subscription.halted":
            console.log("Subscription Halted:", payload.subscription);
            break;

        case "subscription.charged":
            console.log("Subscription Charged:", payload.subscription);
            break;

        case "subscription.cancelled":
            console.log("Subscription Cancelled:", payload.subscription);
            break;

        case "subscription.completed":
            console.log("Subscription Completed:", payload.subscription);
            break;

        case "subscription.updated":
            console.log("Subscription Updated:", payload.subscription);
            break;

// Fund Account Events
        case "fund_account.validation.completed":
            console.log("Fund Account Validation Completed:", payload.fund_account);
            break;

        case "fund_account.validation.failed":
            console.log("Fund Account Validation Failed:", payload.fund_account);
            break;

// Refund Events
        case "refund.speed_changed":
            console.log("Refund Speed Changed:", payload.refund);
            break;

        case "refund.processed":
            console.log("Refund Processed:", payload.refund);
            break;

        case "refund.failed":
            console.log("Refund Failed:", payload.refund);
            break;

        case "refund.created":
            console.log("Refund Created:", payload.refund);
            break;

// Account Events
        case "account.instantly_activated":
            console.log("Account Instantly Activated:", payload.account);
            break;

        case "account.activated_kyc_pending":
            console.log("Account Activated, KYC Pending:", payload.account);
            break;

// Payment Link Events
        case "payment_link.paid":
            console.log("Payment Link Paid:", payload.payment_link);
            break;

        case "payment_link.partially_paid":
            console.log("Payment Link Partially Paid:", payload.payment_link);
            break;

        case "payment_link.expired":
            console.log("Payment Link Expired:", payload.payment_link);
            break;

        case "payment_link.cancelled":
            console.log("Payment Link Cancelled:", payload.payment_link);
            break;

        default:
            console.log("Unhandled Event:", event);
    }

    res.status(200).send("Webhook received successfully");
};

module.exports = handleWebhook;
