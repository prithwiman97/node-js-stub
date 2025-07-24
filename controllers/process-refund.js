const { RequestFields, ResponseFields } = require("../common/constants.js");
const { hashHmac, getRequestMapping, getResponseMapping, getSecretKey } = require("../common/util.js");

const processRefundRequest = (requestObj) => {
    const requestMapping = getRequestMapping();
    const requestData = {};
    for (const key in requestMapping) {
        requestData[requestMapping[key]] = requestObj[key];
    }

    const responseMapping = getResponseMapping();

    const responseData = {
        [responseMapping[ResponseFields.UNIQUE_ID]]: requestData[RequestFields.UNIQUE_ID],
        [responseMapping[ResponseFields.REFUNDED_AMOUNT]]: requestData[RequestFields.REFUND_AMOUNT],
        [responseMapping[ResponseFields.REFUND_TRANS_ID]]: requestData[RequestFields.TRANS_ID]?.toString() + "123",
        [responseMapping[ResponseFields.STATUS]]: "200",
        [responseMapping[ResponseFields.ERROR_MESSAGE]]: "",
    };

    console.log("Refund Response = ", responseData);

    const secretKey = getSecretKey();

    if (true) {
        let hashInput = "";
        // Generate hash input by concatenating all the key values in the response object as key=value without any separator
        for (let key in responseData) {
            hashInput += key + "=" + responseData[key];
        }

        console.log("Hash Input = " + hashInput);
        responseData[responseMapping[ResponseFields.SIGNATURE]] = hashHmac(secretKey, hashInput, "sha256");
    }

    return responseData;
}

exports.processRefundPOST = async (req, res) => {
    const data = req.query;
    const responseData = processRefundRequest(data);
    res.json(responseData);
}