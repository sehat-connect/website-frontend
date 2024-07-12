'use client'

import Image from "next/image";
import {React, useContext, useEffect} from 'react'
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useRouter } from 'next/router'
import LoginForm from "@/components/LoginForm";
import VerifyToken from "@/components/Helper/VerifyToken";
import GetCookie from "@/components/Helper/GetCookie";
import AuthContext from "@/components/Auth/Auth";
import dynamic from "next/dynamic"


export default function Login() {

  
  const GoogleLoginBtn = dynamic(() => import('@/components/SocialLogin/GoogleLoginBtn'), {
    ssr: false,
})
const Auth = useContext(AuthContext)

  const router = useRouter();
  
  // useEffect(()=>{
      
  //         (async()=>{
  //             const verify = await VerifyToken();
  //             if(GetCookie("token")){
  //                 if(verify){
  //                     router.push('/feed/asthma')
  //                 }
  //             }
  //         })();
      
  // },[])



  return (
    <PageLayout  title="Feeds | Healthy Habits,  Strong Community" login={false}>

      <section className="bg-main pt-6">
        <div className="container flex flex-wrap">

          <div className="w-full grid sm:grid-cols-2 grid-cols-1 overflow-hidden rounded-md p-6 ">
            <div className="relative bg-[#20C4C8] text-center sm:rounded-s-xl rounded-xl overflow-hidden">
                <span className="w-[600px] h-[600px] rounded-full bg-[#a4fcff] absolute left-[50%] top-[65%] translate-x-0 shadow-custom1"></span>
                <span className="w-[350px] h-[350px] rounded-full bg-[#44ccd0] absolute left-[50%] top-[65%] translate-x-0 shadow-custom"></span>
                <p className="relative mb-4 sm:text-[34px] text-[24px] font-medium text-white sm:w-[60%] w-[100%] py-[80px] m-auto leading-[1.2]">Connect with a supportive community, sharing experiences and insights</p>
                <Image src="/images/login_bg.png" width={500} height={400} className="relative object-contain m-auto " alt="" />
            </div>
            <div className=" bg-[#fff] text-center rounded-e-xl grid place-content-center sm:px-[120px] px-4 mt-4">
                <h4 className="sm:text-[34px] text-[24px] font-medium text-black">Join Community</h4>
               
                
               
                  <LoginForm />

                  <div className="social-login-wrap">
                    <div className='h5 title text-center font-semibold py-2'>OR</div>
                    {router.query.url ?
                    <GoogleLoginBtn redirectUrl={`/feed/${router.query.url}`} />
                    :
                    <GoogleLoginBtn />
                    }
                  </div>

                {/* <input type='text' className='w-full text-[#848484] px-5 border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg '/>
                
                <div class="grid grid-cols-6 gap-2 hidden">
                    <input type="password"  className='w-full text-[#848484] text-center border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg ' id='ist' maxlength="1" />
                    <input type="password" className='w-full text-[#848484] text-center border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg ' id="sec" maxlength="1" />
                    <input type="password" className='w-full text-[#848484] text-center border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg ' id="third" maxlength="1"  />
                    <input type="password" className='w-full text-[#848484] text-center border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg ' id="fourth" maxlength="1"  />
                    <input type="password" className='w-full text-[#848484] text-center border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg ' id="fifth" maxlength="1" />
                    <input type="password" className='w-full text-[#848484] text-center  border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg ' id="sixth" maxlength="1" />
                </div> */}
                {/* <input type='text' className='w-full text-[#848484] px-5 border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg '/> */}
               
                <p className="text-[#535353] text-[14px] mb-6 hidden"> <Link href='#' className="text-[#176FD6]">Resend OTP </Link>in 2:30 </p>
               
                {/* <a target="_blank" class="w-[180px] bg-[#20C4C8] text-center py-2 m-auto text-white border-[#20C4C8] font-semibold  border-2  rounded " href="#"> Request OTP</a>
                */}
                <p className="text-[#535353] text-[14px] mt-6">By continuing, you agree to our <Link href='#' className="text-[#176FD6]">Terms of Service & Privacy Policy</Link> </p>
            </div>
          </div>

        </div>
      </section>



    </PageLayout>
  );
}
