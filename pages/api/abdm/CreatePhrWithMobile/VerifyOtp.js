import { encryptWithPublicKey } from "@/components/utils/encryptWithPublicKey";

export default async function handler(req, res) {
    const otp = JSON.parse(req.body).otp;
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const transactionId = JSON.parse(req.body).transactionId;
    const encryptedNumber = encryptWithPublicKey(otp);
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v1/phr/registration/verify/otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                otp: encryptedNumber,
                transactionId: transactionId,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
