export default async function handler(req, res) {
    const query = await fetch(`https://dev.abdm.gov.in/gateway/v0.5/sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
        }),
    });
    const data = await query.json();
    res.status(200).json(data);
}
