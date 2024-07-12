import Link from "next/link"
import { useState } from "react"
import Image from "next/image"



export default function NoImage({height,width,className}){
    
    return(
           <Image src="/images/placeholder.jpg" width={width} height={height} className={className} alt="" />
    )
} 
    