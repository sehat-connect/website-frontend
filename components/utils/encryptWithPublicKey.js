const NodeRSA = require("node-rsa");

export const encryptWithPublicKey = (key) => {
    const publicKey = new NodeRSA(process.env.publicKey, "pkcs8-public", {
        encryptionScheme: {
            scheme: "pkcs1",
            hash: "sha256",
        },
    });
    const encryptedData = publicKey.encrypt(key, "base64");
    return encryptedData;
};
