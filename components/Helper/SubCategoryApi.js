import Ajax from "./Ajax"
const SubCategoryApi = async(category) => {
    const response = await Ajax({
        url2 : `/all-subcategory/${category}`
    })
    if(response.status === true){
        return response
    }
}
export default SubCategoryApi