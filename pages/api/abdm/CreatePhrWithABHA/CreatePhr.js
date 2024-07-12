import { encryptWithPublicKey } from "@/components/utils/encryptWithPublicKey";

export default async function handler(req, res) {
    const password = JSON.parse(req.body).password;
    const phrAddress = JSON.parse(req.body).phrAddress;
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const transactionId = JSON.parse(req.body).transactionId;

    const encryptedPassword = encryptWithPublicKey(password);
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v1/phr/registration/hid/create-phr-address`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                alreadyExistedPHR: false,
                password: encryptedPassword,
                phrAddress: phrAddress,
                transactionId: transactionId,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
