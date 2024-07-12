
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Participate from "@/components/participate";


export default function Home({allData}) {
  return (
    <PageLayout  title="Community | Healthy Habits,  Strong Community">

      <section className="bg-main min-h-[520px] flex items-center ">
        <div className="container flex items-center flex-wrap px-4">
          <div className="sm:w-1/2 w-full order-2 sm:order-none">
            <h1 className="text-[36px] sm:text-[60px] font-bold text-[#272727] leading-tight sm:mb-6 mb-2">{allData.banner.title} </h1>
            <p className="text-[16px] sm:text-[20px]  text-[#535353] mb-6">{allData.banner.description}</p>
            <div className="">
                <h5  className=" text-[18px] font-bold  text-[#384144] mb-2">Download the App</h5>
                <div className="flex gap-4">
                    <Link href="#" className="bg-circler shadow-md py-1 flex px-6 justify-center items-center rounded-lg">
                        <Image src='/images/play.png' width={140} height={40} className="object-contain  mix-blend-soft-light h-[50px]" alt="" />
                    </Link>
                    <Link href="#" className="bg-circler shadow-md  flex px-4 justify-center items-center rounded-lg">
                        <Image src='/images/store.png' width={140} height={40} className="object-contain mix-blend-soft-light h-[50px]" alt="" />
                    </Link>
                </div>
            </div>
          </div>
          <div className="sm:w-1/2 w-full ">
          <Image src={allData.banner.file} width={520} height={420} className="kk object-contain m-auto" alt="" />

          </div>
        </div>
      </section>

      <section className="py-10 relative overflow-hidden">
        <span className="absolute w-[300px] h-[300px] -left-40 top-20 bg-circler rounded-full"></span>
        <span className="absolute w-[300px] h-[300px] -right-40 bottom-20 bg-circler rounded-full rotate-180"></span>
        <div className="container px-4">
            <div className="sm:w-3/4 w-full m-auto">
                <h2 className="text-[28px] sm:text-[40px] font-bold text-center text-[#272727] leading-tight">{allData.heading.title}</h2>
                <p className="text-center text-[16px] sm:text-[22px] font-medium text-[#384144] my-4">{allData.heading.whatTitle}</p>
                <p className="text-center text-[16px] sm:text-[18px] text-[#535353]">{allData.heading.description}</p>
                <div className="relative overflow-hidden sm:w-[80%] w-[100%] sm:h-[400px] h-[auto] rounded-xl mt-8 m-auto border-2 border-[#ACD2D3] shadow-xl" >
                <video  controls fill className="object-cover  h-full w-full" >
                    <source src="/images/sehat_video.mp4" type="video/mp4" />
                    </video>
                    {/* <Image src='/images/digitally_bg.png' fill className="object-cover  h-full w-full" alt="" /> */}
                    {/* <span className="cursor-pointer absolute w-[60px] h-[60px] rounded-full flex bg-white translate-x-[-50%] translate-y-[-50%] shadow-xl justify-center items-center left-[50%] top-[50%]"><svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 7.5L0.25 0.138784L0.25 14.8612L13 7.5Z" fill="#20C4C8"/></svg></span> */}
                </div>
            </div>
        </div>
      </section>



      <section className="py-10 relative overflow-hidden">
        <div className="container px-4">
            <div className="w-full text-center mb-6">
                <h2 className="text-[28px] sm:text-[40px] font-bold  text-[#272727] leading-tight ">{allData.heading.howTitle}</h2>
                <p className=" text-[16px] sm:text-[18px] mt-2 text-[#535353]">{allData.heading.howDescription}</p>
            </div>
            {/* <div className="flex justify-between gap-[100px] items-center">
                
                <div className="w-1/2">
                    <Image src='/images/connect1.png' width={480} height={420} className="object-contain mt-2 m-auto h-[420px]" alt="" />
                </div>
                <div className="w-1/2 ">
                    <h2 className="text-[34px] font-bold  text-[#272727] leading-tight ">Access India’s digital health ecosystem</h2>
                    <p className=" my-5 text-[#535353]">Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission) integrated PHR platform, enabling the user and their family to securely maintain and access their medical records anytime, from anywhere using Sehat Connect Health Locker app. Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission).</p>
                    
                    <Link href="#" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded transition-all duration-500 hover:bg-white hover:text-[#20C4C8]'> Create ABHA  </Link>
                    <div className="flex gap-10 mt-6">
                        <Link href='#' className=" font-medium text-[#384144] underline">Learn more about ABHA</Link>
                        <Link href='#' className=" font-medium text-[#384144] underline">How to Create ABHA</Link>
                    </div>
                </div>
            </div>

            
            <div className="flex justify-between gap-[100px] items-center">
                
                <div className="w-1/2 ">
                    <h2 className="text-[34px] font-bold  text-[#272727] leading-tight ">Vitals data tracking to measure your health</h2>
                    <p className=" my-5 text-[#535353]">Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission) integrated PHR platform, enabling the user and their family to securely maintain and access their medical records anytime, from anywhere using Sehat Connect Health Locker app. Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission).</p>
                    
                    <Link href="#" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded '> Explore More  </Link>
                </div>
                <div className="w-1/2">
                    <Image src='/images/connect2.png' width={480} height={420} className="object-contain mt-2 m-auto h-[420px]" alt="" />
                </div>
            </div> */}


            {
                allData.featureList.rows.map((item,index)=> (
                    
                <div className="flex justify-between sm:gap-[100px] gap-[50px] sm:mb-0 mb-8 items-center flex-col sm:flex-row" key={`item--${index}`}>
                    
                    <div className={`sm:w-1/2 w-full order-0 ${(index+1)%2==0 ? 'sm:order-1': 'sm:order-0' }`}>
                        <Image src={item.file} width={480} height={420} className="object-contain mt-2 m-auto h-[420px]" alt="" />
                    </div>
                    <div className='sm:w-1/2 w-full '>
                        <h2 className="text-[28px] sm:text-[34px] font-bold  text-[#272727] leading-tight ">{item.title}</h2>
                        <p className=" my-5 text-[#535353]">{item.description}</p>
                        
                        <Link href="/abdm" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded transition-all duration-500 hover:bg-white hover:text-[#20C4C8]'> Explore More  </Link>
                    </div>
                </div>
                ))
            }

            {/* <div className="flex justify-between gap-[100px] items-center">
                
                <div className="w-1/2">
                    <Image src='/images/connect3.png' width={480} height={420} className="object-contain mt-2 m-auto h-[420px]" alt="" />
                </div>
                <div className="w-1/2 ">
                    <h2 className="text-[34px] font-bold  text-[#272727] leading-tight ">Smart health locker to store your 
health records</h2>
                    <p className=" my-5 text-[#535353]">Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission) integrated PHR platform, enabling the user and their family to securely maintain and access their medical records anytime, from anywhere using Sehat Connect Health Locker app. Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission).</p>
                    
                    <Link href="#" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded transition-all duration-500 hover:bg-white hover:text-[#20C4C8]'> Explore More  </Link>
                </div>
            </div>


            <div className="flex justify-between gap-[100px] items-center">
                
                <div className="w-1/2 ">
                    <h2 className="text-[34px] font-bold  text-[#272727] leading-tight ">Explore related health communities
and more</h2>
                    <p className=" my-5 text-[#535353]">Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission) integrated PHR platform, enabling the user and their family to securely maintain and access their medical records anytime, from anywhere using Sehat Connect Health Locker app. Sehat Connect is India’s first ABDM (Ayushman Bharat Digital Mission).</p>
                    
                    <Link href="#" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded transition-all duration-500 hover:bg-white hover:text-[#20C4C8]'> Explore Communities   </Link>
                </div>
                <div className="w-1/2">
                    <Image src='/images/connect4.png' width={480} height={420} className="object-contain mt-2 m-auto h-[420px]" alt="" />
                </div>
            </div> */}
        </div>
      </section>

      
      <Participate />

    </PageLayout>
  );
}






export async function getStaticProps() {
    const res = await fetch(`${process.env.apiUrl}/home/pageData`)
    const data = await res.json()

    const allData = data.result
   
    // const allBanner = data.result.banner
    // const allHeading = data.result.heading
    // const allFeatureList = data.result.featureList.rows

    // const banner = {
    //     title: allBanner.title,
    //     description: allBanner.description,
    //     ...(allBanner.file && {file: allBanner.file}),
    // }
    // const heading = {
    //     title: allHeading.title,
    //     description: allHeading.description,
    //     whatTitle: allHeading.whatTitle,
    //     howTitle: allHeading.howTitle,
    //     howDescription: allHeading.howDescription,
    //     participateTitle: allHeading.participateTitle,
    //     participateDescription: allHeading.participateDescription,
    //     ...(allBanner.video && {file: allBanner.video}),
    //     ...(allBanner.participateImage && {file: allBanner.participateImage}),
    //     healthTitle: allHeading.healthTitle,
    //     healthDescription: allHeading.healthDescription,
    // }


    // allFeatureList.forEach(function(i){
    //     allFeatureList.push({
    //         title: i.title,
    //         description: i.description,
    //         ...(i.file && {file: i.file}),
    //     })
    // })

    // const featureList = {
    //     rows: allFeatureList,
    // };

    

    // const allData = {
    //     allBanner: banner,
    //     allHeading: heading,
    //     allFeatureList: featureList,
    // };
    return { 
        props: {
            allData: allData
        },
    }



}  
