import Ajax from "./Ajax"
const BusinessStates = async(countryId) => {
    const response = await Ajax({
        url : `/api/business-state/${countryId}`
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
export default BusinessStates