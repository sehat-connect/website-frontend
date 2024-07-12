import { encryptWithPublicKey } from "@/components/utils/encryptWithPublicKey";

export default async function handler(req, res) {
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const txnId = JSON.parse(req.body).txnId;
    const otp = JSON.parse(req.body).otp;
    const encryptedOtp = encryptWithPublicKey(otp);

    const query = await fetch(
        `${process.env.abdmSbxUrl}/v2/registration/aadhaar/verifyMobileOTP`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                otp: encryptedOtp,
                txnId: txnId,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
