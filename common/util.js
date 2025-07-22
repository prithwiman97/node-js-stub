const crypto = require('crypto');
const { RequestFields, ResponseFields } = require("./constants.js");


exports.isNullOrEmpty = (value) => {
    return !value || value === "";
}


exports.hashHmac = (key, data, algorithm = 'sha256') => {
    return crypto.createHmac(algorithm, key)
        .update(data)
        .digest('hex'); // You can change 'hex' to 'base64' if needed
}

exports.getRequestMapping = () => {
    return {
        unique_id: RequestFields.UNIQUE_ID,
        refund_amount: RequestFields.REFUND_AMOUNT,
        reason: RequestFields.REASON,
        transaction_id: RequestFields.TRANS_ID,
    }
}

exports.getResponseMapping = () => {
    return {
        [ResponseFields.UNIQUE_ID]: "unique_id",
        [ResponseFields.REFUNDED_AMOUNT]: "refunded_amount",
        [ResponseFields.REFUND_TRANS_ID]: "refund_transaction_id",
        [ResponseFields.STATUS]: "status",
        [ResponseFields.ERROR_MESSAGE]: "error_msg",
        [ResponseFields.SIGNATURE]: "signature",
    }
}

exports.getSecretKey = () => {
    return "testkey";
}