import Image from "next/image";
import { Inter } from "next/font/google";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useState,useEffect } from "react";
import Ajax from "./Helper/Ajax";


export default function Participate() {

  const [pageData, setPageData] = useState(null);

    useEffect(()=>{
      (async()=>{const action={
          url2:'/home/pageData'
      };
      const sendData = await Ajax(action);
      const contactHeading = sendData.data.result
      setPageData ( contactHeading ) 
    
    })();
    },[])
  


  return (
    <>
      
      <section className="py-10 before:absolute footer_gradinet before:w-full before:left-0 relative before:h-[300px] before:bottom-0 ">
        <div className="container ">
            <div className="bg-main-gradient relative rounded-lg py-6 sm:px-16 px-4 flex items-center flex-col  sm:flex-row ">
                <div className="sm:w-1/2 w-full mb-4 sm:mb-0">
                    <h2 className="text-[28px] sm:text-[40px] font-bold  text-[#fff]">{pageData && pageData.heading.participateTitle}</h2>
                    <p className=" text-[16px] sm:text-[20px]  text-[#fff] sm:my-8 my-4">{pageData && pageData.heading.participateDescription}</p>
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
                <div className="sm:w-1/2 w-full relative text-center before:absolute before:h-[320px] before:w-[320px] before:left-[50%] before:-translate-x-[50%] before:-translate-y-[50%] before:top-[50%] before:rounded-full before:bg-[#fff] before:opacity-10 ">
                    <Image src="/images/mobile_img.png" alt="" width={200} height={200} className="object-contain relative m-auto w-[200px] z-10" />
                </div>
            </div>
        </div>
      </section>

    </>
  );
}
