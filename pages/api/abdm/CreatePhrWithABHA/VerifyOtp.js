import { encryptWithPublicKey } from "@/components/utils/encryptWithPublicKey";

export default async function handler(req, res) {
    const transactionId = JSON.parse(req.body).transactionId;
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const otp = JSON.parse(req.body).otp;
    const encryptedOtp = encryptWithPublicKey(otp);
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v1/phr/registration/hid/confirm/credential`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                value: encryptedOtp,
                transactionId: transactionId,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
