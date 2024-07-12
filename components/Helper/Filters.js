import Ajax from "./Ajax"
const Filters = async(category) => {
    const response = await Ajax({
        url2 : `/filter/${category}`
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
export default Filters