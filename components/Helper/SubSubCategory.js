import Ajax from "./Ajax"
const SubSubCategory = async(formData) => {
    const response = await Ajax({
        url : `/api/sub-subcategory`,
        method: 'POST',
        data: formData,
        token: true
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
export default SubSubCategory