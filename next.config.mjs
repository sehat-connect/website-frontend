/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        apiUrl: "https://api.sehatconnect.com/api",
        webUrl: "https://sehat-connect.vercel.app/",
        abdmDevUrl: "https://dev.abdm.gov.in/api",
        abdmSbxUrl: "https://phrsbx.abdm.gov.in/api",
        abdmHealthIdSbxUrl: "https://healthidsbx.abdm.gov.in/api/",
        clientId: "SBX_004796",
        clientSecret: "76a97f04-4420-4dac-ad6d-a5f0a20198f3",
        googleClientId: '782459713935-fe53krvpok2ilvcuth40eku05kf24eee.apps.googleusercontent.com',
        phrID: "sehat-connect",
        publicKey:
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7Zq7YKcjmccSBnR9CDHd6IX96V7D/a2XSMs+yCgejSe956mqjA/0Q9h+Xnx7ZZdwe2Tf2Jq/mWXa+gYdnta58otreXg/5oGnNV3Edlixz1Oc8tJg5bG4sIUCGZcbEQGSbm1iC+Fp1kS+YLVG4Su8KoRxcCvRJI2QkfqAruX3JoFjggOkv0TgWCo9z6NV6PPmPN3UsXyH3OPDi3Ewnvd64ngCUKPSBiIDwhLj2yYSShcxH8aWbrz00SJodBJzqgjvCfZuljBXXIN4Ngi/nzqEJ7woKQ1kNgWoHFZy7YL74PihW//4OlniSRoITX+7ChILIv2ezSmAdIjpNJ9Dg9XKcQIDAQAB",
    },
    images: {
        domains: [
            "arahas.s3.amazonaws.com",
            "arahas.s3.ap-south-1.amazonaws.com",
            "sehat-connect-bucket-1.s3.amazonaws.com",
            "sehat-connect-bucket-1.s3.ap-south-1.amazonaws.com",
            "binary-s3-bucket.s3.amazonaws.com",
        ],
    },
};

export default nextConfig;
