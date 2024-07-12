import Ajax from "./Ajax"
const BusinessPincode = async(cityId) => {
    const response = await Ajax({
        url : `/api/business-pincode`,
        method: 'POST',
        data: req.body
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
export default BusinessPincode