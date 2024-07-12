import Ajax from "./Ajax"
const Products = async() => {
    const response = await Ajax({
        url2 : `/category-wise-product?country=${process.env.globalWebsite}`
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
export default Products