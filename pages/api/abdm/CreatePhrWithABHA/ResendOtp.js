export default async function handler(req, res) {
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const transactionId = JSON.parse(req.body).transactionId;
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v1/phr/registration/hid/init/resendOtp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                transactionId: transactionId,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
