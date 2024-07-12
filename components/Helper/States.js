import Ajax from "./Ajax"
const States = async(countryId) => {
    const response = await Ajax({
        url : `/api/state/${countryId}`
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
export default States