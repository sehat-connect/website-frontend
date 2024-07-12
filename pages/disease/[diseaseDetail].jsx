import Image from "next/image";
import { Inter } from "next/font/google";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContext } from 'react'
import { useRef } from "react";
import AuthContext from "@/components/Auth/Auth";
import CommunitySide from "@/components/CommunitySide";
import Ajax from "@/components/Helper/Ajax";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import NoImage from "@/components/NoImage";
import PostCard from "@/components/PostCard";
import moment from "moment";

export default function Diseases({ allData }) {
  console.log(allData);
  return (
    <PageLayout title="Feeds | Healthy Habits,  Strong Community">

      <section className="bg-white pb-6 pt-6">
        <div className="container flex flex-wrap px-4">

          <div className="sm:w-5/12 w-full sm:pe-[100px] pe-0 mb-4">
          <div className="sticky top-4 overflow-hidden h-[500px] rounded-[10px] relative  before:absolute disease_page before:w-full before:h-[60%] before:left-0 before:top-[0]">
            <div className="absolute p-[25px] left-0">
              <h1 className="text-[#fff] font-medium sm:text-[52px] text-[36px] mb-4">{allData.title}</h1>
              <Link href="/" target='_blank' className='sm:min-w-[220px] min-w-full bg-[#fff] text-center py-3 inline-flex  px-4 text-[#000] border-[#20C4C8] hover:border-[#fff] font-semibold  border-2  rounded transition-all duration-500 hover:bg-[#20C4C8] hover:text-[#fff]'> {allData.title} Community <svg width="25" height="25" className="ms-2 " viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 18.6912L15.5 12.6912L9.5 6.69116" stroke="#384144" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg></Link>
              </div>
              {allData.file && allData.file ?
              <Image src={allData.file} width={480} height={420} className="object-cover m-auto w-full h-full" alt="" />
              :
              <NoImage width={480} height={420} className="object-cover m-auto w-full h-full" alt=""/>}
            </div></div>
          
          <div className="sm:w-7/12 w-full">
            <div className="">
              <h2 className="text-[#272727] font-semibold sm:text-[40px] text-[28px] mb-2">Overview</h2>
              <div  className="text-[#6a6a6a] sm:text-[18px] text-[16px]  mb-6" dangerouslySetInnerHTML={{__html:allData.description}}></div>
              <h2  className="text-[#272727] font-semibold sm:text-[40px] text-[28px] mb-2">Symptoms</h2>
              <div   className="text-[#6a6a6a]  sm:text-[18px] text-[16px]   mb-6" dangerouslySetInnerHTML={{__html:allData.symtomsDescription}}></div>
              <h2  className="text-[#272727] font-semibold sm:text-[40px] text-[28px] mb-2">Causes</h2>
              <div  className="text-[#6a6a6a]  sm:text-[18px] text-[16px]   mb-4"  dangerouslySetInnerHTML={{__html:allData.causesDescription}}></div>
            </div>
          </div>

        </div>
      </section>



    </PageLayout>
  )
}
export async function getServerSideProps({ params}) {
  // const id = query.id 
  const res = await fetch(`${process.env.apiUrl}/community/pageData?slug=${params.diseaseDetail}`)

  const data = await res.json()

  // console.log(data.result.allPostList);
  const allData = data.result.AllCommunityList[0]
  return {
    props: {
      allData: allData
    },
  }
}  
