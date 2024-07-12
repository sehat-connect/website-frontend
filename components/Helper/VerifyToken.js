import React from 'react'
import Ajax from './Ajax'

const VerifyToken = async() => {
    const getData = await Ajax({
        url: `/user/profile`,
        token: true,
    })
    if(getData.data.status && getData.data.status == "SUCCESS!"){
        return getData.data.result
    }
    else{
        return false
    }
    // return getData.data.status;
}

export default VerifyToken