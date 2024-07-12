import Link from "next/link"
import AuthContext from "./Auth/Auth"
import { useContext, useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import Image from "next/image"
import NoImage from "./NoImage"
import Ajax from "./Helper/Ajax"
import { useRouter } from "next/router"
import moment from "moment"

import { toast } from 'react-toastify';
import { all } from "axios"



export default function PostCard({ data, updateFunction,comID ,profileId}) {

  const router = useRouter();
// console.log(router)
  const [share, setShare] = useState(false);
  const [likePostList, setLikePostList] = useState(false)

  const getLikedPost = async () => {
    const response = await Ajax({
      url2: `/community/postLike?limit=100`,
      token: true,
    })
    if (response.data.status === "SUCCESS!") {
        const allLkedList = response.data.result.rows
        const likedArray = []
        if (allLkedList.length > 0){
          allLkedList.forEach((item)=>{
            likedArray.push(item.communityPostId)
          })

          setLikePostList(likedArray)
        }
    }
  }

  const [applausePostList, setApplausePostList] = useState(false)

  const getApplausePost = async () => {
    const response = await Ajax({
      url2: `/community/postApplause?limit=100`,
      token: true,
    })
    if (response.data.status === "SUCCESS!") {
        const allApplauseList = response.data.result.rows
        const applauseArray = []
        if (allApplauseList.length > 0){
          allApplauseList.forEach((item)=>{
            applauseArray.push(item.communityPostId)
          })
          setApplausePostList(applauseArray)
        }
    }
  }

  const [supportPostList, setSupportPostList] = useState(false)

  const getSupportPost = async () => {
    const response = await Ajax({
      url2: `/community/postSupport?limit=100`,
      token: true,
    })
    if (response.data.status === "SUCCESS!") {
        const allSupportList = response.data.result.rows
        const supportArray = []
        if (allSupportList.length > 0){
          
          allSupportList.forEach((item)=>{
            // console.log(item.communityPostId)
            supportArray.push(item.communityPostId)
          })
          setSupportPostList(supportArray)
        }
    }
  }

  useEffect(() => {
    (()=>{
      getSupportPost()
      getApplausePost()
      getLikedPost()
    })();
  }, [])

  
  const likeData = async (id) => {

    const formDataFormat = {
      "communityPostId": id,
    };
    const action = {
      method: 'POST',
      url2: '/community/postLike',
      data: formDataFormat,
      token: true,
      loader: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {

      if(formSendStatus.data.event == 0){
        // console.log("hello")
        const oldLikeData = likePostList
        if(oldLikeData.includes(id)){
          const removeIndex = oldLikeData.indexOf(id);
          
          if (removeIndex > -1) { 
            oldLikeData.splice(removeIndex, 1); 
          }
          setLikePostList(oldLikeData)
        }
      }
      else if(formSendStatus.data.event != 0){
        const oldLikeData = likePostList
        const newArrayValue = []
        if(oldLikeData == false || !oldLikeData.includes(id) ){
          newArrayValue.push(id)
          setLikePostList(newArrayValue)
        }
      }


      // getLikedPost()
      updateFunction()
    }
    else {
      toast.error('Error')
    }
  }


  


  

  

  // const [applausePost, setApplausePost] = useState(false)
  const applauseData = async (id) => {

    const formDataFormat = {
      "communityPostId": id,
    };
    const action = {
      method: 'POST',
      url2: '/community/postApplause',
      data: formDataFormat,
      token: true,
      loader: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      // setApplausePost(!applausePost)
      // getApplausePost()

      if(formSendStatus.data.event == 0){
        // console.log("hello")
        const oldApplauseData = applausePostList
        if(oldApplauseData.includes(id)){
          const removeIndex = oldApplauseData.indexOf(id);
          
          if (removeIndex > -1) { 
            oldApplauseData.splice(removeIndex, 1); 
          }
          setApplausePostList(oldApplauseData)
        }
      }
      else if(formSendStatus.data.event != 0){
        const oldApplauseData = applausePostList
        const newArrayValue = []
        if(oldApplauseData == false || !oldApplauseData.includes(id) ){
          newArrayValue.push(id)
          setApplausePostList(newArrayValue)
        }
      }


      updateFunction()
    }
    else {
      toast.error('Error')
    }
  }

  // const [supportPost, setSupportPost] = useState(false)
  const supportData = async (id) => {

    const formDataFormat = {
      "communityPostId": id,
    };
    const action = {
      method: 'POST',
      url2: '/community/postSupport',
      data: formDataFormat,
      token: true,
      loader: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      if(formSendStatus.data.event == 0){
        // console.log("hello")
        const oldSupportData = supportPostList
        if(oldSupportData.includes(id)){
          const removeIndex = oldSupportData.indexOf(id);
          
          if (removeIndex > -1) { 
            oldSupportData.splice(removeIndex, 1); 
          }
          setSupportPostList(oldSupportData)
        }
      }
      else if(formSendStatus.data.event != 0){
        const oldSupportData = supportPostList
        const newArrayValue = []
        if(oldSupportData == false || !oldSupportData.includes(id) ){
          newArrayValue.push(id)
          setSupportPostList(newArrayValue)
        }
      }

      updateFunction()
    }
    else {
      toast.error('Error')
    }
  }



  const message = useRef();
  // const [replayPost, setReplayPost] = useState(data.ReplyList)
  const replayData = async (id) => {

    const formDataFormat = {
      "communityPostId": id,
      "message": message.current.value,
    };
    const action = {
      method: 'POST',
      url2: '/community/postReplay',
      data: formDataFormat,
      token: true,
      loader: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      toast.success('Replay submit')
      updateFunction()
      message.current.value= ''
      // setReplayPost(data.ReplyList)
    }
    else {
      toast.error('Error')
    }
  }


  const HidePost = async (id) => {
    
    const formDataFormat = {
      "communityPostId": id,
    };
    const action = {
      method: 'POST',
      url2: `/community/communityPostHide`,
      data: formDataFormat,
      token: true,
      loader: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      toast.success('Post Hide')
      updateFunction()
      setTimeout(() => {
        router.reload()
      }, 2000);

    }
    else {
      toast.error('Error')
    }
  }

  const reportPost = async (id) => {

    const formDataFormat = {
      "communityPostId": id,
    };
    const action = {
      method: 'POST',
      url2: '/community/communityPost/report',
      data: formDataFormat,
      token: true,
      loader: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      toast.success('Report Submit')
      // setReplayPost(data.ReplyList)
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


  const [joinCom, setJoinCom] = useState(null)

  // console.log(joinCom)
  useEffect(() => {
    const getResponse = setTimeout(function () {
      (async () => {
        const response = await Ajax({
          url2: `/community/joinCommunity`,
          token: true,
        })
        if (response.data.status === "SUCCESS!") {
          setJoinCom(response.data.result.allJoinCommunity.rows)
        }

      })()
    }, 100)
    return () => {
      clearInterval(getResponse)
    }
  }, [])


  
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

  

  const [option, setOption] = useState(false);



  return (

    <>
      <div className=" bg-white rounded-lg p-6 shadow-md mb-4" >
        <div className="relative justify-between flex gap-x-4">
          <div className="flex gap-2 items-center flex-wrap">
            {data.UserDetail.photo ?
              <Image src={data.UserDetail.photo} alt="" width={60} height={60} className=" w-[40px] rounded-full h-[40px] object-contain" /> :
              <NoImage width={60} height={60} className=" w-[40px] rounded-full h-[40px] object-contain" />
            }
            <div className=" leading-none">
              {data.UserDetail.firstName ?
                <p className="text-[#272727] font-semibold mb-1">{data.UserDetail.firstName} {data.UserDetail.lastName}</p>
                : <p className="text-[#272727] font-semibold mb-1">User</p>}
              <span className="text-[#868686]  text-[12px] "> {moment(data.createdAt).startOf('min').fromNow()}</span>
            </div>
          </div>
          <div>
            <button onClick={() => setOption(!option)} className="text-[#272727] text-[14px] items-center flex gap-[4px] w-[10px] justify-end">
              <svg width="3" height="17" viewBox="0 0 3 17" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="1.5" cy="1.417" rx="1.5" ry="1.417" fill="#535353" /><ellipse cx="1.5" cy="8.5" rx="1.5" ry="1.417" fill="#535353" /><ellipse cx="1.5" cy="15.583" rx="1.5" ry="1.417" fill="#535353" /></svg></button>
{   profileId != data.UserDetail.id ? 

            <div className={`${option ? '' : 'hidden'} absolute bg-white shadow-md w-[140px] p-3 right-[15px] top-[0px] z-50 rounded-lg border-2 `} >
              <button onClick={() => HidePost(data.id)} className='mb-2 flex items-center gap-2 font-medium text-[#484848] text-[14px]' ><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11.213 11.213A6.3 6.3 0 0 1 7.5 12.5c-4.375 0-6.875-5-6.875-5a11.5 11.5 0 0 1 3.163-3.712m2.4-1.138A5.7 5.7 0 0 1 7.5 2.5c4.375 0 6.875 5 6.875 5-.38.71-.832 1.378-1.35 1.994m-4.2-.669a1.875 1.875 0 1 1-2.65-2.65M.625.625l13.75 13.75" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h15v15H0z" /></clipPath></defs></svg>Hide</button>

              <button onClick={() => reportPost(data.id)} className='flex items-center gap-2 font-medium text-[#484848] text-[14px]' ><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.667 9.375s.667-.625 2.667-.625S8.667 10 10.667 10s2.667-.625 2.667-.625v-7.5s-.667.625-2.667.625-3.333-1.25-5.333-1.25-2.667.625-2.667.625zm0 4.375V9.375" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>Report</button>
            </div>
:
            <div className={`${option ? '' : 'hidden'} absolute bg-white shadow-md w-[140px] p-3 right-[15px] top-[0px] z-50 rounded-lg border-2 `} >
              <button onClick={() => deletePost(data.id)} className='flex items-center gap-2 font-medium text-[#484848] text-[14px]' ><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3.55h11.475m-1.276 0v8.925a1.275 1.275 0 0 1-1.276 1.275H3.548a1.275 1.275 0 0 1-1.275-1.275V3.55m1.913 0V2.275A1.275 1.275 0 0 1 5.461 1h2.55a1.275 1.275 0 0 1 1.275 1.275V3.55" stroke="#CE5259" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Delete Post</button>

            </div>

}
 
          </div>
        </div>

        <p className="text-[#6A6A6A] my-4 ">{data.message}</p>
        {data.file &&
          <div className="relative overflow-hidden  my-2 rounded-xl">
            <Image src={data.file} alt="" width={400} height={400} className="m-auto rounded-xl h-auto max-h-[400px] object-contain" />
          </div>}
          {joinCom && joinCom.filter(join => join.CommunityDetail && join.CommunityDetail.id == comID).length > 0 ?
             <>               
        <div className="flex gap-6 py-2 items-center flex-wrap relative">
          {/* {likePostList.length} */}
          <button onClick={() => likeData(data.id)} className=" text-[#272727] text-[14px] items-center flex gap-[4px]" >
            <svg width="14" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><g ><path fill="#fff" d="M0 0h13v13H0z" /><path d="M3.658 4.979H.795l-.532.4v6.592c.177.2.799.599 1.864.599 1.066 0 1.776-.4 1.998-.6l1.065.6c.71.089 2.61.213 4.528 0 1.918-.213 2.13-1.154 1.998-1.598.266-.955.785-3.236.732-4.728-.053-1.491-2.464-1.198-3.662-.865.488-1.066 1.358-3.423.932-4.329-.533-1.132-1.798.2-2.397 1.532-.48 1.065-2.33 3.24-3.196 4.195l-.467-1.798Z" fill={`${likePostList.length > 0 && likePostList.includes(data.id) ? '#498FFA' : '#fff'}`} /><path d="M9.477 4.784c.552 0 1.059-.006 1.565 0 .989.015 1.854.776 1.95 1.777.035.367-.066.752-.131 1.123-.196 1.12-.38 2.244-.62 3.354-.088.406-.28.804-.498 1.159-.325.532-.84.79-1.45.793-1.574.009-3.148.009-4.722 0-.506 0-.951-.19-1.348-.566-.36.511-.87.59-1.424.571-.478-.015-.957 0-1.436-.004-.81-.013-1.355-.566-1.359-1.4a768.584 768.584 0 0 1 0-5.68c.004-.827.535-1.365 1.339-1.377.506-.008 1.013.02 1.519-.007.713-.037 1.266.187 1.57.986.533-.612 1.055-1.17 1.533-1.765.847-1.055 1.613-2.17 2.148-3.435.103-.244.29-.327.534-.314 1.178.065 1.884.95 1.758 2.173-.086.84-.38 1.598-.773 2.322-.045.084-.087.165-.155.29Zm-1.554 7.297c.737 0 1.473-.013 2.21.004.517.012.86-.234 1.068-.697.094-.206.165-.422.21-.645.239-1.286.478-2.572.683-3.863.034-.216-.049-.493-.166-.685-.214-.348-.567-.498-.97-.499-.764 0-1.529.012-2.292-.011-.147-.005-.353-.114-.417-.24-.065-.127-.022-.343.04-.493.078-.188.23-.343.34-.517.454-.724.82-1.484.896-2.36.046-.519-.127-.906-.469-1.065-.166-.077-.25-.057-.34.126C7.685 3.195 6.29 4.961 4.634 6.514a.55.55 0 0 0-.162.352 346.83 346.83 0 0 0-.006 3.939c0 .78.487 1.272 1.249 1.275.736.002 1.472 0 2.209 0ZM.887 8.74v2.796c0 .387.147.54.515.544.56.005 1.122.006 1.683 0 .341-.004.493-.158.494-.505.002-1.873.002-3.746 0-5.62 0-.355-.14-.5-.485-.504a91.523 91.523 0 0 0-1.657 0c-.428 0-.552.132-.552.582 0 .901 0 1.803.002 2.706Z" fill={`${likePostList.length > 0 && likePostList.includes(data.id) ? '#498FFA' : '#535353'}`} /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h13v13H0z" /></clipPath></defs></svg>
            <b>{data.LikeCount} </b> Likes</button>
          <button onClick={() => supportData(data.id)} className="text-[#272727] text-[14px]  items-center flex gap-[4px]">
            { supportPostList.length > 0 && supportPostList.includes(data.id) ?
            <>
            {/* {supportPostList[0]} */}
            <Image src="/images/supp1.svg" width={20} height={20} className="object-contain w-[14px]" alt="" /></>
              
              :
              <Image src="/images/supp.svg" width={20} height={20} className="object-contain w-[14px]" alt="" />
            }
            <b>{data.SupportCount} </b> Support</button>
          <button onClick={() => applauseData(data.id)} className="text-[#272727] text-[14px]  items-center flex gap-[4px]">
            {applausePostList.length > 0 && applausePostList.includes(data.id) ?
              <Image src="/images/app1.svg" width={20} height={20} className="object-contain w-[14px]" alt="" />
              :
              <Image src="/images/app.svg" width={20} height={20} className="object-contain w-[14px]" alt="" />
            }
            <b>{data.ApplauseCount}  </b> Applause</button>

          <button onClick={() => setShare(!share)} className="text-[#272727] text-[14px] items-center flex gap-[4px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g ><path d="M7.437 7.497a6.741 6.741 0 0 0-2.416.534c-1.915.806-3.326 2.144-4.155 4.08-.27.63-.542 1.26-.815 1.89-.026-.015-.05-.024-.05-.031.012-1.166-.033-2.337.055-3.498.151-2.05 1.06-3.755 2.572-5.124C3.95 4.15 5.512 3.488 7.292 3.363c.027 0 .055-.011.117-.025V0L14 5.408l-6.563 5.404V7.497ZM.871 10.335c.183-.233.313-.407.452-.573a9.42 9.42 0 0 1 .437-.496C3.467 7.51 5.546 6.65 7.981 6.64c.208 0 .264.064.26.267-.012.616-.004 1.231-.003 1.847 0 .087.009.174.017.311L12.7 5.406l-4.462-3.66v2.426c-1.84-.064-3.468.446-4.866 1.612C1.974 6.951 1.158 8.45.873 10.334H.871Z" fill="#535353" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h14v14H0z" /></clipPath></defs></svg>Share</button>
          <div className={`${share ? '' : 'hidden'} absolute bg-white shadow-md w-auto p-4 right-[15px] -top-[28px] z-50 rounded-lg border-2 `} >
            <button onClick={onCopy} link-data={`${process.env.webUrl}feed/${router.query.feedDetail}?id=${data.id}`} className='flex items-center gap-2 font-medium text-[#484848] text-[14px]' ><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 7.875H9.625a1.75 1.75 0 0 0-1.75 1.75V17.5c0 .966.784 1.75 1.75 1.75H17.5a1.75 1.75 0 0 0 1.75-1.75V9.625a1.75 1.75 0 0 0-1.75-1.75" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.375 13.125H3.5a1.75 1.75 0 0 1-1.75-1.75V3.5A1.75 1.75 0 0 1 3.5 1.75h7.875a1.75 1.75 0 0 1 1.75 1.75v.875" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>Copy Link</button>
          </div>


        </div>
       
        <div className="relative">

          <input type='text' ref={message} placeholder='Reply to this post...' className='w-full text-[#848484] p-3 mt-2  border-2 border-[#DFDFDF] outline-0 text-[14px]  rounded-lg ' />
          <button onClick={() => replayData(data.id)} className="absolute right-[15px] top-[55%] -translate-y-[50%]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 404.644 404.644" ><path fill="#20C4C8" d="M5.535 386.177c-3.325 15.279 8.406 21.747 19.291 16.867l367.885-188.638h.037c4.388-2.475 6.936-6.935 6.936-12.08 0-5.148-2.548-9.611-6.936-12.085h-.037L24.826 1.6C13.941-3.281 2.21 3.189 5.535 18.469c.225 1.035 21.974 97.914 33.799 150.603l192.042 33.253-192.042 33.249C27.509 288.26 5.759 385.141 5.535 386.177" data-original="#20C4C8" /></svg>
          </button>
        </div>
        </>    
 :
 <>               
 <div className="flex gap-6 py-2 items-center flex-wrap relative ">
   {/* {likePostList.length} */}
   <button  className="cursor-not-allowed text-[#272727] text-[14px] items-center flex gap-[4px]" >
     <svg width="14" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><g ><path fill="#fff" d="M0 0h13v13H0z" /><path d="M3.658 4.979H.795l-.532.4v6.592c.177.2.799.599 1.864.599 1.066 0 1.776-.4 1.998-.6l1.065.6c.71.089 2.61.213 4.528 0 1.918-.213 2.13-1.154 1.998-1.598.266-.955.785-3.236.732-4.728-.053-1.491-2.464-1.198-3.662-.865.488-1.066 1.358-3.423.932-4.329-.533-1.132-1.798.2-2.397 1.532-.48 1.065-2.33 3.24-3.196 4.195l-.467-1.798Z" fill={`${likePostList.length > 0 && likePostList.includes(data.id) ? '#498FFA' : '#fff'}`} /><path d="M9.477 4.784c.552 0 1.059-.006 1.565 0 .989.015 1.854.776 1.95 1.777.035.367-.066.752-.131 1.123-.196 1.12-.38 2.244-.62 3.354-.088.406-.28.804-.498 1.159-.325.532-.84.79-1.45.793-1.574.009-3.148.009-4.722 0-.506 0-.951-.19-1.348-.566-.36.511-.87.59-1.424.571-.478-.015-.957 0-1.436-.004-.81-.013-1.355-.566-1.359-1.4a768.584 768.584 0 0 1 0-5.68c.004-.827.535-1.365 1.339-1.377.506-.008 1.013.02 1.519-.007.713-.037 1.266.187 1.57.986.533-.612 1.055-1.17 1.533-1.765.847-1.055 1.613-2.17 2.148-3.435.103-.244.29-.327.534-.314 1.178.065 1.884.95 1.758 2.173-.086.84-.38 1.598-.773 2.322-.045.084-.087.165-.155.29Zm-1.554 7.297c.737 0 1.473-.013 2.21.004.517.012.86-.234 1.068-.697.094-.206.165-.422.21-.645.239-1.286.478-2.572.683-3.863.034-.216-.049-.493-.166-.685-.214-.348-.567-.498-.97-.499-.764 0-1.529.012-2.292-.011-.147-.005-.353-.114-.417-.24-.065-.127-.022-.343.04-.493.078-.188.23-.343.34-.517.454-.724.82-1.484.896-2.36.046-.519-.127-.906-.469-1.065-.166-.077-.25-.057-.34.126C7.685 3.195 6.29 4.961 4.634 6.514a.55.55 0 0 0-.162.352 346.83 346.83 0 0 0-.006 3.939c0 .78.487 1.272 1.249 1.275.736.002 1.472 0 2.209 0ZM.887 8.74v2.796c0 .387.147.54.515.544.56.005 1.122.006 1.683 0 .341-.004.493-.158.494-.505.002-1.873.002-3.746 0-5.62 0-.355-.14-.5-.485-.504a91.523 91.523 0 0 0-1.657 0c-.428 0-.552.132-.552.582 0 .901 0 1.803.002 2.706Z" fill={`${likePostList.length > 0 && likePostList.includes(data.id) ? '#498FFA' : '#535353'}`} /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h13v13H0z" /></clipPath></defs></svg>
     <b>{data.LikeCount} </b> Likes</button>
   <button  className="cursor-not-allowed text-[#272727] text-[14px]  items-center flex gap-[4px]">
     {supportPostList.length > 0 && supportPostList.includes(data.id) ?
       <Image src="/images/supp1.svg" width={20} height={20} className="object-contain w-[14px]" alt="" />
       :
       <Image src="/images/supp.svg" width={20} height={20} className="object-contain w-[14px]" alt="" />
     }
     <b>{data.SupportCount} </b> Support</button>
   <button  className="text-[#272727] cursor-not-allowed text-[14px]  items-center flex gap-[4px]">
     {applausePostList.length > 0 && applausePostList.includes(data.id) ?
       <Image src="/images/app1.svg" width={20} height={20} className="object-contain w-[14px]" alt="" />
       :
       <Image src="/images/app.svg" width={20} height={20} className="object-contain w-[14px]" alt="" />
     }
     <b>{data.ApplauseCount}  </b> Applause</button>

   <button onClick={() => setShare(!share)}  className="text-[#272727]  text-[14px] items-center flex gap-[4px]">
     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g ><path d="M7.437 7.497a6.741 6.741 0 0 0-2.416.534c-1.915.806-3.326 2.144-4.155 4.08-.27.63-.542 1.26-.815 1.89-.026-.015-.05-.024-.05-.031.012-1.166-.033-2.337.055-3.498.151-2.05 1.06-3.755 2.572-5.124C3.95 4.15 5.512 3.488 7.292 3.363c.027 0 .055-.011.117-.025V0L14 5.408l-6.563 5.404V7.497ZM.871 10.335c.183-.233.313-.407.452-.573a9.42 9.42 0 0 1 .437-.496C3.467 7.51 5.546 6.65 7.981 6.64c.208 0 .264.064.26.267-.012.616-.004 1.231-.003 1.847 0 .087.009.174.017.311L12.7 5.406l-4.462-3.66v2.426c-1.84-.064-3.468.446-4.866 1.612C1.974 6.951 1.158 8.45.873 10.334H.871Z" fill="#535353" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h14v14H0z" /></clipPath></defs></svg>Share</button>
   <div className={`${share ? '' : 'hidden'} absolute bg-white shadow-md w-auto p-4 right-[15px] -top-[28px] z-50 rounded-lg border-2 `} >
     <button onClick={onCopy} link-data={`${process.env.webUrl}feed/${router.query.feedDetail}?id=${data.id}`} className='flex items-center gap-2 font-medium text-[#484848] text-[14px]' ><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 7.875H9.625a1.75 1.75 0 0 0-1.75 1.75V17.5c0 .966.784 1.75 1.75 1.75H17.5a1.75 1.75 0 0 0 1.75-1.75V9.625a1.75 1.75 0 0 0-1.75-1.75" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.375 13.125H3.5a1.75 1.75 0 0 1-1.75-1.75V3.5A1.75 1.75 0 0 1 3.5 1.75h7.875a1.75 1.75 0 0 1 1.75 1.75v.875" stroke="#535353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>Copy Link</button>
   </div>


 </div>

 <div className="relative">

   <input type='text' ref={message}  placeholder='Reply to this post...' disabled className=' w-full text-[#848484] p-3 mt-2  border-2 border-[#DFDFDF] outline-0 text-[14px]  rounded-lg ' />
   <button  className="cursor-not-allowed absolute right-[15px] top-[55%] -translate-y-[50%]">
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 404.644 404.644" ><path fill="#20C4C8" d="M5.535 386.177c-3.325 15.279 8.406 21.747 19.291 16.867l367.885-188.638h.037c4.388-2.475 6.936-6.935 6.936-12.08 0-5.148-2.548-9.611-6.936-12.085h-.037L24.826 1.6C13.941-3.281 2.21 3.189 5.535 18.469c.225 1.035 21.974 97.914 33.799 150.603l192.042 33.253-192.042 33.249C27.509 288.26 5.759 385.141 5.535 386.177" data-original="#20C4C8" /></svg>
   </button>
 </div>
 </>  

 
}
        {data.ReplyList.length > 0 &&
          <div className="relative mt-4 border-l-2 pl-3 border-[#20C4C8]">
            {data.ReplyList &&
              data.ReplyList.map((item, index) => (
                <div className="flex gap-2  mb-2 p-2 rounded-lg bg-main " key={`replay-${index}`}>
                  {item.userDetail.photo ?
                    <Image src={item.userDetail.photo} alt="" width={60} height={60} className=" w-[25px] rounded-full h-[25px] object-contain" /> :
                    <NoImage width={60} height={60} className=" w-[25px] rounded-full h-[25px] object-contain" />
                  }
                  <div className="leading-[15px] flex gap-1 items-center">
                    {item.userDetail.firstName ?
                      <p className="text-[#20C4C8]  font-medium text-[12px]">{item.userDetail.firstName} {item.userDetail.lastName}
                        <span className="text-[#000] font-[400] text-[12px] "> {item.message}</span> </p>
                      : <p className="text-[#20C4C8]  font-medium text-[12px]">User
                        <span className="text-[#000] text-[12px] "> {item.message}</span> </p>}
                  </div>
                </div>
              ))
            }
          </div>
        }


      </div>
    </>
  )
}
