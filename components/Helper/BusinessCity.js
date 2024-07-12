import Ajax from "./Ajax"
const BusinessCity = async(stateId) => {
    const response = await Ajax({
        url : `/api/business-city/${stateId}`
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
export default BusinessCity