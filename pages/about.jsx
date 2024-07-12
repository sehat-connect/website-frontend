
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Participate from "@/components/participate";
import { useState } from "react";

export default function About({allData}) {

    
  const [acc, setAcc] = useState(true);
  return (
    <PageLayout  title="Community | Healthy Habits,  Strong Community">

      <section className="bg-main min-h-[520px] flex items-center ">
        <div className="container flex items-center py-6 flex-wrap px-4">
          <div className="sm:w-1/2 w-full ">
            <h1 className="sm:text-[60px] text-[38px] font-bold text-[#272727] leading-tight mb-6">About
             <span className="block text-[#20C4C8]">Sehat Connect</span> </h1>
          </div>
          <div className="sm:w-1/2 w-full">
          <Image src='/images/about11.png' width={520} height={420} className=" object-contain m-auto" alt="" />

          </div>
        </div>
      </section>


      <section className="py-10 relative overflow-hidden">
        <div className="container">
            <div className="flex justify-between gap-[100px] items-center">
                
                <div className="sm:w-[80%] w-[100%] m-auto text-center">
                    <h2 className="sm:text-[34px] text-[26px] font-bold  text-[#272727] leading-tight ">The smart way of digitally managing health records</h2>
                    <p className=" my-5 text-[#535353]">Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission) integrated PHR platform, enabling the user and their family to securely maintain and access their medical records anytime, from anywhere using Sehat Connect Health Locker app. Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission) integrated PHR platform, enabling the user and their family to securely maintain and access their medical records anytime, from anywhere using Sehat Connect Health Locker app.</p>
                    
                </div>
            </div>

        </div>
      </section>

      
      <section className="pb-10 relative overflow-hidden">
        <div className="container px-4">
            <div className=" flex items-center py-6 gap-8 mt-4 flex-col sm:flex-row">
                <div className="sm:w-1/3 w-full sm:p-10 p-5 text-center shadow-xl rounded-lg">
                    <h2 className="text-[25px] font-bold text-center text-[#272727] ">Mission</h2>
                    <p className="text-[20px]  text-[#384144] mb-6">To fix the broken patient journey by offering full-stack healthcare services and increasing patient centricity.</p>
                </div>
                <div className="sm:w-1/3 w-full sm:p-10 p-5 text-center shadow-xl rounded-lg">
                    <h2 className="text-[25px] font-bold text-center text-[#272727] ">Vision</h2>
                    <p className="text-[20px]  text-[#384144] mb-6">To ensure consistent quality and advanced surgical care and take the latest medical technologies to Tier 2 and Tier 3 cities.</p>
                </div>
                <div className="sm:w-1/3 w-full  sm:p-10 p-5 text-center shadow-xl rounded-lg">
                    <h2 className="text-[25px] font-bold text-center text-[#272727] ">Our Values</h2>
                    <p className="text-[20px]  text-[#384144] mb-2">Inclusive</p>
                    <p className="text-[20px]  text-[#384144] mb-2">Ambitious</p>
                    <p className="text-[20px]  text-[#384144] mb-2">Authentic</p>
                </div>
            </div>
        </div>
      </section>



      <section className="bg-main min-h-[520px] flex items-center ">
        <div className="container flex items-center py-6 px-4 flex-wrap">
          <div className="sm:w-1/2 w-full ">
            <h1 className="text-[28px] sm:text-[40px] font-bold text-[#272727] leading-tight sm:mb-6 mb-2">Our Goal </h1>
            <p className=" sm:text-[20px] text-[16px]  text-[#535353] mb-6">Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission) integrated PHR platform, enabling the user and their family to securely maintain and access their medical records anytime, from anywhere using Sehat Connect Health Locker app. Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission).</p>
          </div>
          <div className="sm:w-1/2  w-full  ">
          <Image src='/images/about12.png' width={520} height={420} className="rounded-lg object-contain m-auto" alt="" />

          </div>
        </div>
      </section>


      
      <section className="py-10 before:absolute footer_gradinet before:w-full before:left-0 relative before:h-[300px] before:bottom-0 ">
        <div className="container px-4">
            <div className="bg-main-gradient relative rounded-lg py-6 sm:px-16 px-4 flex items-center flex-col  sm:flex-row">
                <div className="sm:w-1/2 w-full mb-4 sm:mb-0">
                    <h2 className="text-[28px] sm:text-[40px] font-bold  text-[#fff]">Participate in India’s new
healthcare revolution</h2>
                    <p className=" text-[16px] sm:text-[20px]  text-[#fff] sm:my-8 my-4">Get 100% control of your health records</p>
                    <div className="">
                        <h5  className=" text-[18px] font-bold  text-[#fff] mb-2">Download the App</h5>
                        <div className="flex gap-4">
                            <Link href="#" className="bg-[#F0F5F8] flex px-4 justify-center items-center rounded-lg">
                                <Image src='/images/play.png' width={140} height={40} className="object-contain  h-[50px]" alt="" />
                            </Link>
                            <Link href="#" className="bg-[#F0F5F8] flex px-4 justify-center items-center rounded-lg">
                                <Image src='/images/store.png' width={140} height={40} className="object-contain h-[50px]" alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sm:w-1/2 w-full  relative text-center before:absolute before:h-[320px] before:w-[320px] before:left-[50%] before:-translate-x-[50%] before:-translate-y-[50%] before:top-[50%] before:rounded-full before:bg-[#fff] before:opacity-10 ">
                    <Image src="/images/mobile_img.png" alt="" width={200} height={200} className="object-contain relative m-auto w-[200px] z-10" />
                </div>
            </div>
        </div>
      </section>


    </PageLayout>
  );
}


