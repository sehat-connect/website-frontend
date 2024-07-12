import { encryptWithPublicKey } from "@/components/utils/encryptWithPublicKey";

export default async function handler(req, res) {
    console.log(JSON.parse(req.body));

    const {
        transactionId,
        address,
        dayOfBirth,
        districtCode,
        countryCode,
        email,
        gender,
        firstName,
        lastName,
        mobile,
        monthOfBirth,
        pinCode,
        stateCode,
        yearOfBirth,
        Auth_Token,
    } = JSON.parse(req.body);

    const encryptedEmail = encryptWithPublicKey(email);
    const encryptedMobile = encryptWithPublicKey(mobile);

    console.log(`${process.env.abdmSbxUrl}/v1/phr/registration/details`);
    const query = await fetch(
        `https://phrsbx.abdm.gov.in/api/v1/phr/registration/details`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth_Token}`,
            },
            body: JSON.stringify({
                address: address,
                countryCode: countryCode,
                dayOfBirth: dayOfBirth,
                email: encryptedEmail,
                firstName: firstName,
                gender: gender,
                lastName: lastName,
                mobile: encryptedMobile,
                monthOfBirth: monthOfBirth,
                pinCode: pinCode,
                stateCode: stateCode,
                transactionId: transactionId,
                yearOfBirth: yearOfBirth,
                districtCode: districtCode,
            }),
        }
    );
    console.log(query);
    const data = await query.json();
    res.status(200).json(data);
}
