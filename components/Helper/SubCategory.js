import Ajax from "./Ajax"
const SubCategory = async(category) => {
    const response = await Ajax({
        url2 : `/all-subcategory/${category}?country=${process.env.globalWebsite}`
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
export default SubCategory