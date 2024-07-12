import Image from "next/image";
import { Inter } from "next/font/google";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Participate from "../components/participate";
import NoImage from "@/components/NoImage";


export default function Community({allData}) {
  return (
    <PageLayout  title="Community | Healthy Habits,  Strong Community">

      <section className="bg-main min-h-[520px] flex items-center ">
        <div className="container flex items-center flex-wrap px-4">
          <div className="sm:w-1/2 w-full ">
            <h1 className="text-[40px] sm:text-[60px] font-bold text-[#272727] leading-tight mb-6">Healthy Habits,<br />Strong <span className="text-[#20C4C8]">Community</span></h1>
            <p className="text-[18px] sm:text-[20px]  text-[#535353] mb-6">Welcome to the smart way of digitally managing<br/> health records</p>
          </div>
          <div className="sm:w-1/2 w-full ">
          <Image src='/images/banner_bg.png' width={520} height={420} className="object-contain m-auto" alt="" />

          </div>
        </div>
      </section>

      <section className="py-10 relative overflow-hidden">
        <span className="absolute w-[300px] h-[300px] -left-40 top-20 bg-circler rounded-full"></span>
        <span className="absolute w-[300px] h-[300px] -right-40 bottom-20 bg-circler rounded-full rotate-180"></span>
        <div className="container px-4">
            <div className="sm:w-3/4 w-full m-auto">
                <h2 className="text-[28px] sm:text-[40px]  font-bold text-center text-[#272727] leading-tight">{allData.heading.title}</h2>
                <p className="text-center text-[018px] sm:text-[22px] font-medium text-[#384144] my-4">The smart way of digitally managing health records</p>
                <p className="text-center text-[18px]  text-[#535353]">{allData.heading.description}</p>
                <Image src='/images/community.png' width={480} height={400} className="object-contain mt-8 m-auto w-[480px]" alt="" />
            </div>
        </div>
      </section>



      <section className="py-10 relative overflow-hidden">
        <div className="container px-4">
            <div className="flex justify-between sm:gap-[100px] gap-[50px] items-center flex-col sm:flex-row">
                <div className="sm:w-3/5  ">
                    <h2 className="sm:text-[40px] text-[28px] font-bold  text-[#272727] leading-tight ">{allData.heading.relatedTitle}</h2>
                    <p className=" sm:text-[18px] text-[16px] my-5 text-[#535353]">{allData.heading.relatedDescription}</p>
                    
                    <Link href="#" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded '> Explore Communities  </Link>
                    </div>
                <div className="sm:w-2/5">
                    <Image src='/images/community1.png' width={480} height={420} className="object-contain mt-8 m-auto sm:h-[420px] h-auto" alt="" />
                </div>
            </div>
        </div>
      </section>
      <section className="py-10 relative overflow-hidden">
        <div className="container px-4">
            <div className="flex justify-between sm:gap-[100px] gap-[50px] items-center flex-col sm:flex-row">
                <div className="sm:w-2/5 sm:order-none order-1">
                    <Image src='/images/community2.png' width={480} height={420} className="object-contain mt-8 m-auto sm:h-[420px] h-auto" alt="" />
                </div>
                <div className="sm:w-3/5 ">
                    <h2 className="sm:text-[40px] text-[28px] font-bold  text-[#272727] leading-tight ">{allData.heading.shareTitle}</h2>
                    <p className=" sm:text-[20px] text-[16px]  my-5 text-[#535353]">{allData.heading.shareDescription}</p>
                    <Link href="#" target='_blank' className='min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded '> Explore Communities  </Link>
                    </div>
            </div>
        </div>
      </section>

      
      <section className="py-10 bg-main">
        <div className="container px-4">
            <h2 className="sm:text-[40px] text-[28px] font-bold text-center text-[#272727] leading-tight mb-4">{allData.heading.topTitle}</h2>
            <p className="text-center text-[16px]  sm:text-[20px]   text-[#535353]">{allData.heading.topDescription}</p>
            <div className="grid sm:grid-cols-5 grid-cols-2 gap-6 mt-8 mb-10">
              {
                allData.communityList &&  
                allData.communityList.map((item,index)=>(

                  <div className="text-center shadow-lg rounded-lg sm:p-10 p-5 bg-white" key={`item-${index}`}>
                  {item.thumbnail ?
                    <Image src={item.thumbnail} width={60} height={60} className="object-contain m-auto mb-3 h-[60px]" alt="" />
                    :
                    <NoImage  width={60} height={60} className="object-contain m-auto mb-3 h-[60px]"/>
                  }
                    <h6 className="sm:text-[20px] text-[16px] text-[#414141] font-semibold mb-6">{item.title}</h6>
                    <Link href={`feed/${item.slug}`} className="text-[14px] text-[#20C4C8] font-bold">Explore</Link>
                  </div>
                ))
              }
            </div>
            <div className="text-center ">
            <Link href="/community-list"  className='bg-[#20C4C8] text-center py-3 min-w-[250px] inline-block px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded '> Explore More Communities </Link>

            </div>
        </div>
      </section>


      <Participate />


    </PageLayout>
  );
}



export async function getStaticProps() {
  const res = await fetch(`${process.env.apiUrl}/about/pageData`)
  const data = await res.json()

  const allData = data.result
 
  return { 
      props: {
          allData: allData
      },revalidate: 10,
  }
}  
