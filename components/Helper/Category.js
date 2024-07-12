import Ajax from "./Ajax"
const Category = async() => {
    const response = await Ajax({
        url2 : `/all-category?country=${process.env.globalWebsite}`
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
export default Category