import Link from "next/link"
import AuthContext from "./Auth/Auth"
import { useContext, useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router";
import NoImage from "./NoImage"
import Ajax from "./Helper/Ajax"
import moment from "moment"

import { toast } from 'react-toastify';
import { all } from "axios"



export default function PostCardPro({ data, updateFunction }) {


    const router = useRouter();
    const [profile, setProfile] = useState(null)
    
    // console.log(profile)
      useEffect(()=>{
          const getResponse = setTimeout(function(){  
              (async()=>{ 
              const response = await Ajax({
                  url2: `/user/profile`,
                  token: true,
              })
              if(response.data.status === "SUCCESS!"){
                setProfile(response.data.result)
              }
              
              })()
          },100) 
            return()=>{
              clearInterval(getResponse)
            }
      },[])
    

  const deletePost = async (id) => {
    const action = {
      method: 'DELETE',
      url2: `/community/communityPost/${id}`,
      token: true,
      loader: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      toast.success('Post Delete')
    //   updateFunction()
    setTimeout(() => {
        router.reload()
    }, 2000);
    }
    else {
      toast.error('Error')
    }
  }



  const onCopy = (e) => {
    var copyText = e.target.getAttribute("link-data");
    navigator.clipboard.writeText(copyText);
    alert("Linked Copied ")
  }

  const [allList, setallList] = useState(null);

  useEffect(()=>{
    const getResponse = setTimeout(function(){  
        (async()=>{ 
        const response = await Ajax({
            url2: `/community/pageData`,
        })
        if(response.data.status === "SUCCESS!"){
          setallList(response.data.result.AllCommunityList)
        }
        
        })()
    },100) 
      return()=>{
        clearInterval(getResponse)
      }
},[])



  const [option, setOption] = useState(false);



  return (

    <>
      <div className=" bg-white rounded-lg p-6 shadow-md mb-4" >
        <div className="relative justify-between flex gap-x-4">
          <div className="flex gap-2 items-center flex-wrap">
{/* {
  allList && allList.map((item,index)=>(
    <p key={`item-${index}`}> {item.title}</p>
  ))
} */}
          
            {profile && profile.photo ?
              <Image src={profile.photo} alt="" width={60} height={60} className=" w-[40px] rounded-full h-[40px] object-contain" /> :
              <NoImage width={60} height={60} className=" w-[40px] rounded-full h-[40px] object-contain" />
            }
            <div className=" leading-none">
              {profile && profile.firstName ?
                <p className="text-[#272727] font-semibold mb-1">{profile.firstName} {profile.lastName}</p>
                : <p className="text-[#272727] font-semibold mb-1">User</p>}
              <span className="text-[#868686]  text-[12px] mb-1"> {moment(data.createdAt).endOf('day').fromNow()}</span>

              {allList && allList.filter(allList => allList.id == data.communityId).map((item, index) => ( 
            
            <Link href={`/feed/${item.slug}`} className="text-[#20C4C8]  text-[14px] block mt-2 w-full" key={`item-${index}`}>{item.title} Community</Link>
          ))}


            </div>
          </div>
          <div>
            <button onClick={() => setOption(!option)} className="text-[#272727] text-[14px] items-center flex gap-[4px] w-[10px] justify-end">
              <svg width="3" height="17" viewBox="0 0 3 17" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="1.5" cy="1.417" rx="1.5" ry="1.417" fill="#535353" /><ellipse cx="1.5" cy="8.5" rx="1.5" ry="1.417" fill="#535353" /><ellipse cx="1.5" cy="15.583" rx="1.5" ry="1.417" fill="#535353" /></svg></button>

            <div className={`${option ? '' : 'hidden'} absolute bg-white shadow-md w-[140px] p-3 right-[15px] top-[0px] z-50 rounded-lg border-2 `} >
              <button onClick={() => deletePost(data.id)} className='flex items-center gap-2 font-medium text-[#484848] text-[14px]' ><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.55h11.475m-1.276 0v8.925a1.275 1.275 0 0 1-1.276 1.275H3.548a1.275 1.275 0 0 1-1.275-1.275V3.55m1.913 0V2.275A1.275 1.275 0 0 1 5.461 1h2.55a1.275 1.275 0 0 1 1.275 1.275V3.55" stroke="#CE5259" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Delete Post</button>

            </div>


          </div>
        </div>

        <p className="text-[#6A6A6A] my-4 ">{data.message}</p>
        {data.file &&
          <div className="relative overflow-hidden  my-2 rounded-xl">
            <Image src={data.file} alt="" width={400} height={400} className="m-auto rounded-xl h-auto max-h-[260px] object-contain" />
          </div>}

      </div>
    </>
  )
}
