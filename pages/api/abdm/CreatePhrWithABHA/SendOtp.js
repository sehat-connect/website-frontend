export default async function handler(req, res) {
    const abhaNumber = JSON.parse(req.body).abhaNumber;
    const authMethod = JSON.parse(req.body).authMethod;
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v1/phr/registration/hid/init/transaction`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                authMethod: authMethod,
                healhtIdNumber: abhaNumber,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
