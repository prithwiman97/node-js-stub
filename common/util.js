const crypto = require('crypto');

exports.isNullOrEmpty = (value) => {
    return !value || value === "";
}


exports.hashHmac = (key, data, algorithm = 'sha256') => {
    return crypto.createHmac(algorithm, key)
        .update(data)
        .digest('hex'); // You can change 'hex' to 'base64' if needed
}