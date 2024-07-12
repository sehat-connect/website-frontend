import Link from "next/link"
import AuthContext from "./Auth/Auth"
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import Image from "next/image"
import NoImage from "./NoImage"
import Ajax from "./Helper/Ajax"



export default function CommunitySide({data}){
    
  const Auth = useContext(AuthContext)
  const [acc, setAcc] = useState(true);

  const [joinCom, setJoinCom] = useState(null)
    
  console.log(joinCom)
    useEffect(()=>{
        const getResponse = setTimeout(function(){  
            (async()=>{ 
            const response = await Ajax({
                url2: `/community/joinCommunity`,
                token: true,
            })
            if(response.data.status === "SUCCESS!"){
                setJoinCom(response.data.result.allJoinCommunity.rows)
            }
            
            })()
        },100) 
          return()=>{
            clearInterval(getResponse)
          }
    },[])

    return(
        <div className="w-3/12 pe-6 ">
            <div className=" bg-white rounded-lg p-6 min-h-[180px] shadow-md sticky top-4 ">
            <Link href='/community-list' className="flex gap-2 items-center mb-4 pb-4 border-b-2">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.122 15v-3.5c0-.5-.153-.957-.533-1.272-.272-.223-.615-.464-.945-.494a11.257 11.257 0 0 0-2.32-.004c-.874.1-1.467.868-1.471 1.744-.008 1.038 0 2.078 0 3.118v.374c-.838 0-1.646.03-2.45-.013-.386-.02-.617-.407-.617-.862V8.784c0-.569-.154-.72-.734-.72-.177 0-.371.044-.529-.012-.191-.066-.437-.186-.503-.346-.066-.16.051-.403.105-.605.015-.056.089-.096.133-.143L6.931.324c.434-.432.682-.432 1.118 0 2.232 2.22 4.462 4.442 6.69 6.668a.997.997 0 0 1 .26.569c.025.276-.219.482-.515.499-.221.012-.444 0-.667.004-.442.006-.623.183-.623.627v5.241c0 .778-.282 1.062-1.058 1.062-.656.007-1.311.006-2.014.006Z" fill="#20C4C8" />
            </svg>
            <span className="text-[#20C4C8] text-[18px] font-medium">Home</span>
            </Link>

            {
      !Auth.isLoggedIn ?

<>
            <div onClick={()=>setAcc(!acc)} className="cursor-pointer flex gap-2 items-center mb-4 justify-between"> <svg width="20" height="20" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="#868686">
                    <path d="M7.84 6.627c.25.28.451.53.677.756.406.408.954.634 1.522.628a2.12 2.12 0 0 0 1.51-.658 2.22 2.22 0 0 0 .614-1.559 2.221 2.221 0 0 0-.643-1.546c-.607-.617-1.222-1.224-1.833-1.839a.506.506 0 0 1-.049-.076C10.578 1.27 11.55.295 13.043.05c2.25-.368 4.565 1.326 4.901 3.64.225 1.547-.215 2.854-1.295 3.991-.558-.542-1.209-.742-1.942-.576-.732.167-1.19.675-1.456 1.383-.948-.291-1.762-.101-2.357.715-.55.752-.524 1.557-.057 2.376-.086.054-.173.109-.26.161-.884.531-1.24 1.53-.878 2.507.07.18.07.293-.08.432-.343.326-.663.678-.999 1.013-.379.379-.823.402-1.15.068-.325-.333-.304-.792.061-1.175.312-.325.633-.644.944-.969.31-.324.356-.72.095-.978s-.599-.227-.923.101c-.325.33-.644.665-.971.992-.364.36-.84.373-1.153.036-.313-.337-.281-.784.07-1.152.329-.343.666-.677.994-1.02.3-.313.323-.655.07-.922s-.62-.238-.928.072c-.351.354-.694.715-1.046 1.067-.34.34-.732.355-1.02.047-.288-.308-.26-.678.07-1.017C5.077 9.462 6.426 8.08 7.84 6.627Z" />
                    <path d="M3.375 9.485c-.81-.8-1.647-1.522-2.364-2.353A4.2 4.2 0 0 1 .003 4.225 4.183 4.183 0 0 1 1.24 1.412C2.81-.14 5.26-.195 6.864 1.335 8.157 2.568 9.407 3.85 10.667 5.12c.417.42.413 1.016.018 1.41-.37.366-.955.352-1.357-.04-.203-.2-.397-.409-.598-.61-.562-.56-1.282-.563-1.838.004-1.163 1.184-2.319 2.373-3.517 3.601Zm9.257.102c.089.05.298.116.44.255a69.62 69.62 0 0 1 1.763 1.8.814.814 0 0 1 .247.575.831.831 0 0 1-.227.584c-.325.345-.796.36-1.152.005a106.11 106.11 0 0 1-1.784-1.828c-.244-.254-.306-.566-.155-.892.147-.315.396-.494.868-.5Zm2.56-1.363c.18.092.393.15.537.284.38.352.74.73 1.094 1.11.337.36.334.816.014 1.152-.33.347-.792.354-1.152 0a34.112 34.112 0 0 1-1.089-1.116.782.782 0 0 1-.148-.896c.136-.304.376-.479.744-.534Zm-2.795 6.836c-.633.006-1.64-1.03-1.631-1.55.005-.348.182-.587.473-.735a.682.682 0 0 1 .816.105c.296.272.578.56.844.864a.719.719 0 0 1 .098.836c-.15.296-.389.47-.6.48Z" />
                </g>
                <defs>
                    <clipPath id="a">
                    <path fill="#fff" d="M0 0h18v16H0z" />
                    </clipPath>
                </defs>
                </svg>
                <span className="text-[18px] text-[#434343] font-medium mr-auto"> Communities</span>
                    <svg width="8" height="5" viewBox="0 0 8 5" className={`${acc ? 'rotate-180  ' : 'rotate-0 ' } transition-all duration-500 `} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4 4 1 1 4" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
                <div className={`${acc ? ' max-h-[1400px] ' : ' max-h-[0px]' } ps-4 transition-all duration-500 overflow-hidden`}> 
                    { data && data.map((item,index)=>( 
                        <div key={`item-${index}`}>
                            {item.slug &&
                            <a href={`/feed/${item.slug}`} className="flex gap-2 items-center mb-4">
                                { item.thumbnail ?
                                    <Image src={item.thumbnail} width={20} height={20} className="object-contain" alt="" />
                                    :
                                    <NoImage  width={20} height={20}/>
                                }
                                <span className="text-[#434343]">{item.title}</span>
                            </a>
                            }
                        </div> 
                    )) } 
                </div>
</>

:


<>
            <div onClick={()=>setAcc(!acc)} className="cursor-pointer flex gap-2 items-center mb-4 justify-between"> <svg width="20" height="20" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="#868686">
                    <path d="M7.84 6.627c.25.28.451.53.677.756.406.408.954.634 1.522.628a2.12 2.12 0 0 0 1.51-.658 2.22 2.22 0 0 0 .614-1.559 2.221 2.221 0 0 0-.643-1.546c-.607-.617-1.222-1.224-1.833-1.839a.506.506 0 0 1-.049-.076C10.578 1.27 11.55.295 13.043.05c2.25-.368 4.565 1.326 4.901 3.64.225 1.547-.215 2.854-1.295 3.991-.558-.542-1.209-.742-1.942-.576-.732.167-1.19.675-1.456 1.383-.948-.291-1.762-.101-2.357.715-.55.752-.524 1.557-.057 2.376-.086.054-.173.109-.26.161-.884.531-1.24 1.53-.878 2.507.07.18.07.293-.08.432-.343.326-.663.678-.999 1.013-.379.379-.823.402-1.15.068-.325-.333-.304-.792.061-1.175.312-.325.633-.644.944-.969.31-.324.356-.72.095-.978s-.599-.227-.923.101c-.325.33-.644.665-.971.992-.364.36-.84.373-1.153.036-.313-.337-.281-.784.07-1.152.329-.343.666-.677.994-1.02.3-.313.323-.655.07-.922s-.62-.238-.928.072c-.351.354-.694.715-1.046 1.067-.34.34-.732.355-1.02.047-.288-.308-.26-.678.07-1.017C5.077 9.462 6.426 8.08 7.84 6.627Z" />
                    <path d="M3.375 9.485c-.81-.8-1.647-1.522-2.364-2.353A4.2 4.2 0 0 1 .003 4.225 4.183 4.183 0 0 1 1.24 1.412C2.81-.14 5.26-.195 6.864 1.335 8.157 2.568 9.407 3.85 10.667 5.12c.417.42.413 1.016.018 1.41-.37.366-.955.352-1.357-.04-.203-.2-.397-.409-.598-.61-.562-.56-1.282-.563-1.838.004-1.163 1.184-2.319 2.373-3.517 3.601Zm9.257.102c.089.05.298.116.44.255a69.62 69.62 0 0 1 1.763 1.8.814.814 0 0 1 .247.575.831.831 0 0 1-.227.584c-.325.345-.796.36-1.152.005a106.11 106.11 0 0 1-1.784-1.828c-.244-.254-.306-.566-.155-.892.147-.315.396-.494.868-.5Zm2.56-1.363c.18.092.393.15.537.284.38.352.74.73 1.094 1.11.337.36.334.816.014 1.152-.33.347-.792.354-1.152 0a34.112 34.112 0 0 1-1.089-1.116.782.782 0 0 1-.148-.896c.136-.304.376-.479.744-.534Zm-2.795 6.836c-.633.006-1.64-1.03-1.631-1.55.005-.348.182-.587.473-.735a.682.682 0 0 1 .816.105c.296.272.578.56.844.864a.719.719 0 0 1 .098.836c-.15.296-.389.47-.6.48Z" />
                </g>
                <defs>
                    <clipPath id="a">
                    <path fill="#fff" d="M0 0h18v16H0z" />
                    </clipPath>
                </defs>
                </svg>
                <span className="text-[18px] text-[#434343] font-medium mr-auto">Joined Communities</span>
                    <svg width="8" height="5" viewBox="0 0 8 5" className={`${acc ? 'rotate-180  ' : 'rotate-0 ' } transition-all duration-500 `} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4 4 1 1 4" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
                <div className={`${acc ? ' max-h-[1400px] ' : ' max-h-[0px]' } ps-4 transition-all duration-500 overflow-hidden`}> 
                    { joinCom && joinCom.map((item,index)=>( 
                        <div key={`item-${index}`}>
                            {item.CommunityDetail && item.CommunityDetail.slug &&
                            <a href={`/feed/${item.CommunityDetail.slug}`} className="flex gap-2 items-center mb-4">
                                { item.CommunityDetail.thumbnail ?
                                    <Image src={item.CommunityDetail.thumbnail} width={20} height={20} className="object-contain" alt="" />
                                    :
                                    <NoImage  width={20} height={20}/>
                                }
                                <span className="text-[#434343]">{item.CommunityDetail.title}</span>
                            </a>
                            }
                        </div> 
                    )) } 
                </div>
            </>}
        </div>
    </div>
    )
} 
    