import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import NoImage from "@/components/NoImage";


export default function CommunityList({allData}) {
  return (
    <PageLayout  title="Home | Sehat Connect">

      <section className="bg-main sm:h-[520px] h-[420px] flex items-center text-center">
        <div className="container px-4">
          <div className="sm:w-2/3 w-full m-auto">
            <h1 className="sm:text-[60px] text-[36px] font-semibold text-[#272727] leading-tight mb-6">Search for Health Conditions and Explore Community</h1>
            <p className="sm:text-[20px] text-[18px]  text-[#535353] mb-6">Welcome to the smart way of digitally managing health records</p>

            <div className='sm:w-3/4 w-full m-auto text-center relative'>
              <input type='text' placeholder='Search Community...' className='w-full text-[#848484] px-10 border-2 border-[#B1F5F6] bg-white outline-0 p-4  rounded-full shadow-lg'/>
              
              <svg width="20" height="20" className="absolute right-8 top-[50%] -translate-y-[50%]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#20C4C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.0004 18.9999L14.6504 14.6499" stroke="#20C4C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </div>
          </div>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container px-4">
            <h2 className="sm:text-[32px] text-[26px] font-semibold text-center text-[#272727] mb-4">All Communities</h2>
            <div className="grid sm:grid-cols-5 grid-cols-2 gap-6 mt-8">
                {
                  allData.AllCommunityList &&  
                  allData.AllCommunityList.map((item,index)=>(
                    <div className="text-center shadow-lg rounded-lg sm:p-10 p-5" key={`item-${index}`}>
                      {item.thumbnail ?
                    <Image src={item.thumbnail} width={60} height={60} className="object-contain m-auto mb-3 h-[60px]" alt="" />:
                    <NoImage  width={60} height={60} className="object-contain m-auto mb-3 h-[60px]"/>
                  }
                      <h6 className="sm:text-[20px] text-[16px] text-[#414141] font-semibold mb-3">{item.title}</h6>
                      {/* <p dangerouslySetInnerHTML={{__html:item.causesDescription}}></p> */}
                      <Link href={`feed/${item.slug}`} className="text-[14px] text-[#20C4C8] font-bold">Explore</Link>
                    </div>
                  ))
                }
              
            </div>
        </div>
      </section>

    </PageLayout>
  );
}



export async function getStaticProps() {
  const res = await fetch(`${process.env.apiUrl}/community/pageData?limit=100`)
  const data = await res.json()

  const allData = data.result
 
  return { 
      props: {
          allData: allData
      },revalidate: 10,
  }



}  

