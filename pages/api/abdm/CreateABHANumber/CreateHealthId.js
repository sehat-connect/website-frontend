export default async function handler(req, res) {
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const txnId = JSON.parse(req.body).txnId;
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v2/registration/aadhaar/createHealthIdByAdhaar`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                consent: true,
                consentVersion: "v1.0",
                txnId: txnId,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
