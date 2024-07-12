'use client'

import Image from "next/image";
import {React, useEffect} from 'react'
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useRouter } from 'next/router'
import LoginForm from "@/components/LoginForm";
import VerifyToken from "@/components/Helper/VerifyToken";
import GetCookie from "@/components/Helper/GetCookie";

export default function Create() {

  const router = useRouter();

  return (
    <PageLayout  title="Feeds | Healthy Habits,  Strong Community" login={false}>

      <section className="bg-white">
        <div className=" flex flex-wrap">

          <div className="w-full grid sm:grid-cols-2 grid-cols-1 overflow-hidden">
            <div className="relative bg-[#20C4C8] text-center  overflow-hidden px-4 mb-6">
                 <p className="relative mb-4 sm:text-[34px] text-[24px] font-medium text-white sm:w-[60%] w-[100%] py-[40px] m-auto leading-[1.2]">Create Ayushman Bharat Health Account</p>
                <Image src="/images/create.png" width={550} height={450} className="relative object-contain m-auto " alt="" />
            </div>
            <div className=" bg-[#fff]  rounded-e-xl grid place-content-center sm:px-[120px] px-4">
                <h4 className="sm:text-[34px] text-[24px] font-medium text-center text-black">Create ABHA Number</h4>
               
                <Link href="/createABHA/abha-number/create" className="border-2 flex rounded-lg items-center p-6 mt-8  gap-x-10">
                    <Image src="/images/aadhar_icon.png" width={60} height={50} className="relative object-contain m-auto " alt="" />
                    <div className="">
                        <h3 className=" text-[16px] font-bold  text-[#272727]">Using Aadhaar OTP</h3>
                        {/* <p className="text-[14px] font-medium text-[#868686]" >Use ABHA Address using ABHA Number.</p> */}
                    </div>
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m1.5 11 5-5-5-5" stroke="#535353" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </Link>
                
            </div>
          </div>

        </div>
      </section>



    </PageLayout>
  );
}
