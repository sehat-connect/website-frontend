import "@/styles/globals.css";
import React, {useContext, useState} from 'react';
import { useEffect } from "react"
import AuthContext from '../components/Auth/Auth';
import Ajax from "@/components/Helper/Ajax";
import GetCookie from "@/components/Helper/GetCookie";
// import UserDetail from '../components/helper/GetUserDetail';
// import CompanyDetail from '../components/helper/GetCompanyDetail';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [userData, setUserData] = useState(false)
  const [userTypeData, setUserTypeData] = useState(false)
  const router = useRouter();

  
  useEffect(() => {
    (async()=>{
      if(!GetCookie('token')){
        setIsLoggedIn(false)
      }
      if(GetCookie('token')){
          // const verify = await VerifyToken('user')
          // const verifyCompany = await VerifyToken('company')
          // if(verify){
              // const userDetail = await UserDetail();
              // console.log(userDetail.data.data)
              setUserData({name:'kartik'});
              // setUserTypeData('user')
              setIsLoggedIn(true)
              setIsVerified(true)
          // }
          // else{
          //   setIsLoggedIn(false)
          //   const today = new Date()
          //   const tomorrow = new Date()
          //   tomorrow.setDate(today.getDate() - 100)
          //   document.cookie = `token=;path=/;expires=${tomorrow}`;
          //   router.push('/login')
          // }
      }
      else{
        setIsLoggedIn(false)
      }
    })() 
  }, []);
  // return <Component {...pageProps} />;
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setLogin: setIsLoggedIn,
        userData: userData,
        setUserData: setUserData,
        // userTypeData: userTypeData,
        // setUserTypeData: setUserTypeData,
        isVerified : isVerified,
        setIsVerified : setIsVerified
      }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}
