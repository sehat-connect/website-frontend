export default async function handler(req, res) {
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const txnId = JSON.parse(req.body).txnId;
    const mobile = JSON.parse(req.body).mobile;
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v2/registration/aadhaar/checkAndGenerateMobileOTP`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                mobile: mobile,
                txnId: txnId,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
