import Ajax from "./Ajax"
const BusinessStateWithType = async(formData, loader) => {
    const response = await Ajax({
        url : `/api/business-state-with-type`,
        method: 'POST',
        data: formData,
        //token: true,
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
export default BusinessStateWithType