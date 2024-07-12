export default async function handler(req, res) {
    const {
        query: { phrAddress },
    } = req;
    const query = await fetch(
        `${process.env.abdmSbxUrl}/v1/phr/search/isExist?phrAddress=${phrAddress}`
    );
    const data = await query.json();
    res.status(200).json(data);
}
