import axios from "axios"
import GetCookie from "./GetCookie";


const Ajax = async (action) => {
    if(action.loader === true) { document.querySelector(".form-loader").classList.add("show") }
    try {
        const resp = await axios({
            headers: {
                ...(action.token === true && {'Authorization': GetCookie('token')}),
            },
            credentials: true,
            preflightContinue: true,
            method: action.method ? action.method : 'GET',
            url: process.env.apiUrl + action.url2,
            ...(action.data && { data: action.data})
        });
        if(action.loader === true) {document.querySelector(".form-loader").classList.remove("show") }
        return resp
    } catch (err) {
        if(action.loader === true) { document.querySelector(".form-loader").classList.remove("show") }
        return err.response
    }
}
export default Ajax