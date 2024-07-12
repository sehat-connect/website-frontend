import Ajax from "./Ajax"
const ServiceCategory = async() => {
    const response = await Ajax({
        url : `/api/service-category`
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
export default ServiceCategory