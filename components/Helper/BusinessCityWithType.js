import Ajax from "./Ajax"
const BusinessCityWithType = async(formData, loader) => {
    const response = await Ajax({
        url : `/api/business-city-with-type`,
        method: 'POST',
        data: formData,
        token: true,
        ...(loader && {loader: true})
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
export default BusinessCityWithType