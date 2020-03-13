var header = {
    "alg": "HS256",
    "typ": "JWT"
};

function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}

function CreateJWT(username, email, secret) {

    var issueTime = Math.floor(+ new Date() / 1000);
    var expiresTime = issueTime + (5 * 60);

    var data = {
        "jti": username,
        "iss": "Sidekick",
        "exp": expiresTime,
        "iat": issueTime
    };

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);

    var signature = encodedHeader + "." + encodedData;
    signature = CryptoJS.HmacSHA256(signature, secret);
    signature = base64url(signature);

    return encodedHeader + "." + encodedData + "." + signature;
}