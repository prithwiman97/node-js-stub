const querystring = require("querystring");
const { isNullOrEmpty, hashHmac } = require("../common/util.js");

exports.processRequestGET = async (req, res) => {
    const formData = req.query;
    let returnUrl = formData["return_url"];
    const returnParams = formData["return_params"];
    const secretKey = formData["secret_key"] || "";
    const signatureFieldName = isNullOrEmpty(formData["signature_field_name"]) ? "signature" : formData["signature_field_name"];
    let signature = "";
    let hashInput = "";

    // if secret is provided then calculate signature using SHA256
    if (secretKey !== "") {
        hashInput = returnParams.replaceAll(",","");
        signature = hashHmac(secretKey, hashInput, "sha256");
        console.log("Signature = " + signature);
    }

    // get key value pairs from return parameters
    const keyValuePairs = returnParams.split(",");

    // empty object to build query string from
    const returnParamsMap = {};
            
    // iterate over list of key value pairs in form key=value and store them in map object
    for (let kvp of keyValuePairs) {
        const kvpArray = kvp.split("=");
        const key = kvpArray[0];
        const value = kvpArray[1];
        returnParamsMap[key] = value;
    }
    
    // if secret is provided then add signature to map object as well
    if (secretKey !== "")
        returnParamsMap[signatureFieldName] = signature;

    // build encoded query string from assoc array
    const encodedReturnParams = querystring.stringify(returnParamsMap);
    console.log("Encoded return params = " + encodedReturnParams);

    if (encodedReturnParams !== "") {
        // check if there are already attached query parameters in return URL
        let returnUrlArray = returnUrl.split("?");
        if (!isNullOrEmpty(returnUrlArray[1])) {
            returnUrl += "&" + encodedReturnParams;
        }
        else
            returnUrl += "?" + encodedReturnParams;
    }
    
    console.log("Final return url = " + returnUrl);

    res.redirect(returnUrl);
}

exports.processRequestPOST = async (req, res) => {
    res.render("process-request", {
        formData: req.body,
        method: req.method,
        isNullOrEmpty,
        hashHmac
    });
}