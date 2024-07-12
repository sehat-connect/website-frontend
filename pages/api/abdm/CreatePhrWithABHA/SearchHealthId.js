export default async function handler(req, res) {
    console.log(JSON.parse(req.body));
    const abhaNumber = JSON.parse(req.body).abhaNumber;
    const Auth_Token = JSON.parse(req.body).Auth_Token;
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v1/phr/registration/hid/search/auth-methods`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                healhtIdNumber: abhaNumber,
            }),
        }
    );
    const data = await query.json();
    res.status(200).json(data);
}
