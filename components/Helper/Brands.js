import Ajax from "./Ajax"
const Brands = async() => {
    const response = await Ajax({
        url2 : `/all-brand`
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
export default Brands