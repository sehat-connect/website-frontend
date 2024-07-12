
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Logo from '../public/images/logo.png'


export default function Footer() {


  return (
    <>
    
    <div className='bg-main py-10'>
      <div className='container px-4'>
          
        <div className='flex justify-between w-full  flex-wrap'>

            <div className=' sm:w-2/6 w-1/1 sm:pe-[100px] pe-[10px] sm:mb-0  mb-4'>
                <Link href="/" >
                    <Image alt="" src={Logo}   className='w-[160px] mb-4 h-[50px] object-contain'/>
                </Link>
                <p className='text-[#535353] font-medium text-[18px] '>Empowering wellness, enriching lives: together for a healthy tomorrow</p>
            </div>
            <div className='sm:w-1/5 w-1/1'>               
                <Link href="/about" className='text-[#384144] font-medium block  py-2'>About Us</Link> 
                <Link href="/community-list" className='text-[#384144] font-medium block  py-2'>Community</Link> 
                {/* <Link href="/" className='text-[#384144] font-medium block  py-2'>ABHA Card</Link>  */}
                <Link href="/ABDM" className='text-[#384144] font-medium block  py-2'>ABDM</Link> 
                <Link href="/contact" className='text-[#384144] font-medium block  py-2'>Contact</Link> 
            </div>
            {/* <div className='w-1/5'>               
                <Link href="/" className='text-[#384144] font-medium block  py-2'>Privacy Policy</Link> 
                <Link href="/" className='text-[#384144] font-medium block  py-2'>Terms and Conditions</Link> 
                <Link href="/" className='text-[#384144] font-medium block  py-2'>Security</Link> 
            </div> */}
            <div className='sm:w-1/5 w-1/1'>               
                <Link href="tel:8595250601" className='text-[#384144] font-medium block  py-2'>Ph: +918595250601</Link> 
                <p className='text-[#384144] font-medium block  py-2'>Registered Office: M-22, Sector-66, Noida, UP 201301</p> 
            </div>

        </div>
        <div className='flex justify-between w-full mt-10 flex-col'>
            <div>
                <p className='text-[#535353]'>@2023 Sehat Connect. All Rights Reserved</p>
            </div>
            <div >               
            <p className='text-[#535353]'>Designed by <a href="https://www.cyberworx.in/" target="_blank" className='text-[#535353] font-medium'> Cyberworx</a> </p>
            </div>
        </div>
        
      </div>
    </div>  
    </>
  )
}

