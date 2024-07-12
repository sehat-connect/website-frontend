import Ajax from "./Ajax"
const CountryProduct = async(CountryId) => {
    const response = await Ajax({
        url : `/api/country-product/${CountryId}`
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
export default CountryProduct