import Ajax from "./Ajax"
const Country = async() => {
    const response = await Ajax({
        url2 : `/country`
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
export default Country