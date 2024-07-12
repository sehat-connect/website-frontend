import { encryptWithPublicKey } from "@/components/utils/encryptWithPublicKey";

export default async function handler(req, res) {
    const request = JSON.parse(req.body);
    const mobileNumber = request.mobileNumber;
    const Auth_Token = request.Auth_Token;
    const encryptedNumber = encryptWithPublicKey(mobileNumber);
    console.log(encryptedNumber);
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v1/phr/registration/generate/otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                value: encryptedNumber,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
