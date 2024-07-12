import Ajax from "./Ajax"
const ProductMenu = async() => {
    const response = await Ajax({
        url2 : `/product-menu?country=${process.env.globalWebsite}`
    })
    const response2 = await Ajax({
        url2 : `/solutionmenu?country=${process.env.globalWebsite}`
    })
    const response3 = await Ajax({
        url2 : `/footer?country=${process.env.globalWebsite}`
    })
    //if(response.status === true && response2.status === true  && response3.status === true ){
        return {
            "data": {
                "product": response,
                "solution": response2,
                "footer": response3
            }
        }
    //}
}
export default ProductMenu