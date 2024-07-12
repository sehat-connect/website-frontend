import Ajax from "./Ajax"
const DownloadTabs = async() => {
    const response = await Ajax({
        url2 : `/allfile`
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
export default DownloadTabs