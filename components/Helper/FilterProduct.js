import Ajax from "./Ajax"
const FilterProduct = async(formData, loader) => {
    const response = await Ajax({
        url : `/api/filter-product`,
        method: 'POST',
        data: formData,
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
export default FilterProduct