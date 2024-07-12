import Ajax from "./Ajax"
const City = async(stateId) => {
    const response = await Ajax({
        url : `/api/city/${stateId}`
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
export default City