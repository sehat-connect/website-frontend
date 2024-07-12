import { encryptWithPublicKey } from "@/components/utils/encryptWithPublicKey";

export default async function handler(req, res) {
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const aadhaarNumber = JSON.parse(req.body).aadhaarNumber;
    const encryptedAadhaar = encryptWithPublicKey(aadhaarNumber);
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v2/registration/aadhaar/generateOtp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                aadhaar: encryptedAadhaar,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
