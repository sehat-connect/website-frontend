import Ajax from "./Ajax"
const BusinessType = async() => {
    const response = await Ajax({
        url : `/api/business-type`
    })
    if(response.status === false){
        return {
            data: []
        }
    }
    if(response.status === true){
        return response
    }
}
export default BusinessType