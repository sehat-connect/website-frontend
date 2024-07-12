
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Participate from "@/components/participate";
import { useState } from "react";

export default function Abha({allData}) {

    
  const [acc, setAcc] = useState(true);
  return (
    <PageLayout  title="Community | Healthy Habits,  Strong Community">

      <section className="bg-main min-h-[520px] flex items-center ">
        <div className="container flex items-center py-6 flex-wrap px-4">
          <div className="sm:w-1/2 w-full">
            <h1 className="sm:text-[60px] text-[36px] font-bold text-[#272727] leading-tight sm:mb-6 mb-3">Ayushman Bharat Digital Mission <span className="block text-[#20C4C8]"> (ABDM)</span> </h1>
            <p className="text-[16px] sm:text-[20px]  text-[#535353] mb-6">Developing the backbone necessary to support the integrated
digital health infrastructure for India.</p>
            <Link href="/createABHA" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded transition-all duration-500 hover:bg-white hover:text-[#20C4C8]'> Create ABHA </Link>
          </div>
          <div className="sm:w-1/2 w-full  mt-2">
          <Image src='/images/abha1.png' width={520} height={420} className=" object-contain m-auto" alt="" />

          </div>
        </div>
      </section>


      <section className="py-10 relative overflow-hidden">
        <div className="container px-4">
            <div className="flex justify-between sm:gap-[100px] gap-[50px] items-center flex-col  sm:flex-row">
                
                <div className="sm:w-1/2 w-full">
                    <Image src='/images/connect1.png' width={480} height={420} className="object-contain mt-2 m-auto sm:h-[420px] h-auto" alt="" />
                </div>
                <div className="sm:w-1/2 w-full">
                    <h2 className="sm:text-[34px] text-[26px] font-bold  text-[#272727] leading-tight ">What is Ayushman Bharat
Digital Mission</h2>
                    <p className=" my-5 text-[#535353]">There are no global parallels to explain ABDM. But closer to home, the UPI framework can be used to understand ABDM quite easily. UPI enables you to transfer money from one entity to another irrespective of which bank the two entities have their accounts in. Similarly, ABDM will enable the movement of health information from one entity to another irrespective of whether the two are connected to each other or not. If you get your health check-up done at any lab and want to share the reports with your Doctor (or Hospital or Insurance Co.) the same can be done with a click.</p>
                    
                </div>
            </div>

        </div>
      </section>

      
      <section className="pb-10 relative overflow-hidden">
        <div className="container px-4">
            <div className="sm:w-3/4 w-full m-auto">
                <h2 className="sm:text-[40px] text-[28px] font-bold text-center text-[#272727] leading-tight">Benefits of ABDM</h2>
                <p className="text-center sm:text-[18px] text-[16px]  text-[#535353]">ABDM is win-win situation for all stakeholders in the healthcare ecosystem</p>
            </div>
            <div className=" flex items-center py-6 flex-wrap mt-4">
                <div className="sm:w-1/3 w-full p-5  sm:p-10 border-r-2 border-b-2">
                    <Image src='/images/bene1.png' width={120} height={80} className="mb-4 h-[50px] object-contain " alt="" />
                    <p className="text-[16px] sm:text-[20px] font-medium text-[#384144] mb-6">Establish unique identity across different healthcare providers</p>
                </div>
                <div className="sm:w-1/3 w-full p-5  sm:p-10 border-r-2 border-b-2">
                    <Image src='/images/bene2.png' width={120} height={80} className="mb-4 h-[50px] object-contain " alt="" />
                    <p className="text-[16px] sm:text-[20px] font-medium text-[#384144] mb-6">Establish unique identity across different healthcare providers</p>
                </div>
                <div className="sm:w-1/3 w-full p-5  sm:p-10 border-b-2">
                    <Image src='/images/bene3.png' width={120} height={80} className="mb-4 h-[50px] object-contain " alt="" />
                    <p className="text-[16px] sm:text-[20px] font-medium text-[#384144] mb-6">Establish unique identity across different healthcare providers</p>
                </div>
                <div className="sm:w-1/3 w-full p-5  sm:p-10 border-r-2 " >
                    <Image src='/images/bene4.png' width={120} height={80} className="mb-4 h-[50px] object-contain " alt="" />
                    <p className="text-[16px] sm:text-[20px] font-medium text-[#384144] mb-6">Establish unique identity across different healthcare providers</p>
                </div>
                <div className="sm:w-1/3 w-full p-5  sm:p-10 border-r-2">
                    <Image src='/images/bene5.png' width={120} height={80} className="mb-4 h-[50px] object-contain " alt="" />
                    <p className="text-[16px] sm:text-[20px] font-medium text-[#384144] mb-6">Establish unique identity across different healthcare providers</p>
                </div>
                <div className="sm:w-1/3 w-full p-5  sm:p-10">
                    <Image src='/images/bene4.png' width={120} height={80} className="mb-4 h-[50px] object-contain " alt="" />
                    <p className="text-[16px] sm:text-[20px] font-medium text-[#384144] mb-6">Establish unique identity across different healthcare providers</p>
                </div>
            </div>
        </div>
      </section>



      <section className="bg-main min-h-[520px] flex items-center ">
        <div className="container flex items-center py-6 px-4 flex-wrap">
          <div className="sm:w-1/2 w-full ">
            <h1 className="sm:text-[40px] text-[28px] font-bold text-[#272727] leading-tight sm:mb-6 mb-3">Participate in India’s new
healthcare revolution </h1>
            <p className="text-[20px]  text-[#535353] mb-6">Create your  ABHA & store all your medical records with
Sehat Connect (Govt of India ABDM approved PHR app)</p>
            <Link href="#" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded transition-all duration-500 hover:bg-white hover:text-[#20C4C8]'> Create ABHA </Link>
          </div>
          <div className="sm:w-1/2 w-full mt-4   ">
          <Image src='/images/abha1.png' width={520} height={420} className=" object-contain m-auto" alt="" />

          </div>
        </div>
      </section>


      

      
    <section className="py-10 relative overflow-hidden">
        <div className="container px-4">
            <div className="w-3/4 ">
                <h2 className="sm:text-[40px] text-[28px] font-bold  text-[#272727] leading-tight">Frequently Asked Questions</h2>
            </div>
            
            <div className=" flex flex-wrap  sm:mt-20 mt-10">
                <div className="sm:w-3/4 w-full pr-10">
                    <div >
                        <div onClick={()=>setAcc(!acc)} className="border-b-2 py-6 cursor-pointer flex gap-2 items-center justify-between">
                            <h4 className="text-[20px] font-bold text-[#384144] ">What is the ABHA number?</h4>
                                <svg width="20" height="8" viewBox="0 0 8 5" className={`${acc ? 'rotate-180  ' : 'rotate-0 ' } transition-all duration-500 `} fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 4 4 1 1 4" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={`${acc ? ' max-h-[1400px] ' : ' max-h-[0px]' } transition-all duration-500 overflow-hidden `}> 
                            <p className="text-[#434343] text-[16px] font-medium py-6">Create your  ABHA & store all your medical records with Sehat Connect (Govt of India ABDM approved PHR app)</p>
                        </div> 
                    </div>
                    <div>
                        <div onClick={()=>setAcc(!acc)} className="border-b-2 py-6 cursor-pointer flex gap-2 items-center justify-between">
                            <h4 className="text-[20px] font-bold text-[#384144] ">Who owns and manages the NDHM portal?</h4>
                                <svg width="20" height="8" viewBox="0 0 8 5" className={`${acc ? 'rotate-180  ' : 'rotate-0 ' } transition-all duration-500 `} fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 4 4 1 1 4" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={`${acc ? ' max-h-[1400px] ' : ' max-h-[0px]' } transition-all duration-500 overflow-hidden`}> 
                            <p className="text-[#434343] text-[16px] font-medium py-6">Create your  ABHA & store all your medical records with Sehat Connect (Govt of India ABDM approved PHR app)</p>
                        </div> 
                    </div>
                    <div>
                        <div onClick={()=>setAcc(!acc)} className="border-b-2 py-6 cursor-pointer flex gap-2 items-center justify-between">
                            <h4 className="text-[20px] font-bold text-[#384144] ">What is the ABHA number?</h4>
                                <svg width="20" height="8" viewBox="0 0 8 5" className={`${acc ? 'rotate-180  ' : 'rotate-0 ' } transition-all duration-500 `} fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 4 4 1 1 4" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={`${acc ? ' max-h-[1400px] ' : ' max-h-[0px]' } transition-all duration-500 overflow-hidden`}> 
                            <p className="text-[#434343] text-[16px] font-medium  py-6">Create your  ABHA & store all your medical records with Sehat Connect (Govt of India ABDM approved PHR app)</p>
                        </div> 
                    </div>
                    <div>
                        <div onClick={()=>setAcc(!acc)} className="border-b-2 py-6 cursor-pointer flex gap-2 items-center justify-between">
                            <h4 className="text-[20px] font-bold text-[#384144] ">Linking ABHA Number with ABHA Address</h4>
                                <svg width="20" height="8" viewBox="0 0 8 5" className={`${acc ? 'rotate-180  ' : 'rotate-0 ' } transition-all duration-500 `} fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 4 4 1 1 4" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={`${acc ? ' max-h-[1400px] ' : ' max-h-[0px]' } transition-all duration-500 overflow-hidden`}> 
                            <p className="text-[#434343] text-[16px] font-medium  py-6">Create your  ABHA & store all your medical records with Sehat Connect (Govt of India ABDM approved PHR app)</p>
                        </div> 
                    </div>
                </div>
                <div className="sm:w-1/4 w-full ">
                    <Image src='/images/mailIcon.png' width={320} height={300} className="mb-4 h-[280px] object-contain " alt="" />
                </div>
            </div>
        </div>
    </section>



      {/* <Participate /> */}


    
      
      <section className="py-10 before:absolute footer_gradinet before:w-full before:left-0 relative before:h-[300px] before:bottom-0 ">
        <div className="container ">
            <div className="bg-main-gradient relative rounded-lg py-6 sm:px-16 px-4 flex items-center flex-col  sm:flex-row">
                <div className="sm:w-1/2 w-full mb-4 sm:mb-0">
                    <h2 className="text-[28px] sm:text-[40px] font-bold  text-[#fff]">Participate in India’s new
healthcare revolution</h2>
                    <p className="text-[16px] sm:text-[20px]  text-[#fff] sm:my-8 my-4">Get 100% control of your health records</p>
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


    </PageLayout>
  );
}


