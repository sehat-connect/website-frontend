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

export default function Community({ allData }) {

  const communityMsg = useRef();
  const communityImg = useRef();
  // const communityId = useRef();
  const router = useRouter();

  const [acc, setAcc] = useState(true);
  const Auth = useContext(AuthContext)
  const [loginMenu, setLoginMenu] = useState(false);

  const [like, setLike] = useState(false);

  // const [communityData,setCommunityData] = useState(allData.allPostList.rows);

  const [searchCommunity, setSearchCommunity] = useState(allData.AllCommunityList);

  async function searchResult(e) {
    const keyword = e.target.value;
    const action = {
      url2: `/community/search?keyword=${keyword}`
    }
    const actionData = await Ajax(action)
    if (actionData.data.status == "SUCCESS!") {
      setSearchCommunity(actionData.data.result)
    }
    console.log(actionData)
  }


  const [profile, setProfile] = useState(null)
  // const router = useRouter();
      
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

  const postData = async (e) => {
    e.preventDefault();
    if (communityImg.current.files || communityMsg.current.value) {

      const formDataFormat = new FormData();

      formDataFormat.append("message", communityMsg.current.value)
      formDataFormat.append("communityId", allData.communityDetail.id)
      if(communityImg.current.files[0]){
        formDataFormat.append("file", communityImg.current.files[0])
      }


      const action = {
        method: 'POST',
        url2: '/community/communityPost',
        data: formDataFormat,
        token: true,
        loader: true,
      }

      const formSendStatus = await Ajax(action)
      if (formSendStatus.data.status === "SUCCESS!") {
        toast.success('Post Created')

        setTimeout(() => {
          router.reload()
        }, 2000);

      }
      else {
        toast.error('Error')
      }

    }
  }

  const [joinCommunity, setJoinCommunity] = useState(null)
  const joinComm = async (id) => {

    const formDataFormat = {
      "communityId": id,
    };
    const action = {
      method: 'POST',
      url2: '/community/joinCommunity',
      data: formDataFormat,
      token: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      toast.success('Community Joined')
      setTimeout(() => {
        router.reload()
      }, 2000);

    }
    else {
      toast.error('Error')
    }

  }


  // const [joinCommunity, setJoinCommunity] = useState(null)
  const leaveComm = async (id) => {

    const formDataFormat = {
      "communityId": id,
    };
    const action = {
      method: 'DELETE',
      url2: `/community/joinCommunity/${id}`,
      data: formDataFormat,
      token: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      toast.success('Community Leaved')
      setTimeout(() => {
        router.reload()
      }, 2000);

    }
    else {
      toast.error('Error')
    }

  }



  const [joinCom, setJoinCom] = useState(null)

  console.log(joinCom)
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


  const updatePage = async () => {
    const slugLink = allData.communityDetail.slug;
    const action = {
      url2: `/community/communityPostList?slug=${slugLink}&sort=${popularityBtn}${router.query.id ? `&id=${router.query.id}` : ''  }`,
      loader: true,
    }
    const actionData = await Ajax(action)
    if (actionData.data.status == "SUCCESS!") {
      setPopularityCommunity(actionData.data.result.allPostList)
      // setUpdatePost(actionData.data.result.allPostList)
      // setPopularityBtn(id)
    }
  }

  const [popularityCommunity, setPopularityCommunity] = useState(allData.allPostList);
  const [popularityBtn, setPopularityBtn] = useState(1);


  useEffect(() => {
    (() => {
      updatePage()
    })()
  }, [popularityBtn, router.query])



  function popularity(id) {
    setPopularityBtn(id)
  }




  const [hidePostList, setHidePostList] = useState(null)

  useEffect(() => {
    // const getResponse = setTimeout(function () {
      (async () => {
        const response = await Ajax({
          url2: `/community/communityPostHideList`,
          token: true,
        })
        if (response.data.status === "SUCCESS!") {
          setHidePostList(response.data.result.rows)
        }

      })();
    // })
  }, [])


  // console.log(allData.allPostList);
  return (
    <PageLayout title="Feeds | Healthy Habits,  Strong Community">

      <section className="bg-main pt-6">
        <div className="container flex flex-wrap">

          <CommunitySide data={allData.AllCommunityList} />
          <div className="w-6/12 pe-6">
            {
                <>
                  <div className=" bg-white rounded-lg p-6 shadow-md mb-4">
                    <div className="flex gap-3 items-center justify-between">
                      <div className="flex gap-3 items-center ">
                        {allData.communityDetail.thumbnail ?
                          <Image src={allData.communityDetail.thumbnail} width={34} height={34} className="object-contain w-[34px] h-[34px]" alt="" />
                          :
                          <NoImage width={34} height={34} />
                        }

                        <span className="text-[#535353] font-semibold ">{allData.communityDetail.title} Community</span>
                      </div>

                      { !Auth.isLoggedIn ?
                      <Link href={`/login?url=${allData.communityDetail.slug}`} className='w-[120px] text-center py-2  text-[#20C4C8] border-[#20C4C8] font-semibold border-2  rounded '   > Join</Link>
                      :
                      joinCom && joinCom.filter(join => join.CommunityDetail && join.CommunityDetail.id == allData.communityDetail.id).length > 0 ?
                        <button onClick={() => leaveComm(allData.communityDetail.id)} className=' text-[12px]   text-[#ff0000]  font-semibold'> Leave Community</button>
                        :
                        <button onClick={() => joinComm(allData.communityDetail.id)} className='w-[120px] text-center py-2  text-[#20C4C8] border-[#20C4C8] font-semibold border-2  rounded '> Join</button>

                      }
                    </div>
                  </div>

                  {
              !router.query.id && joinCom && joinCom.filter(join => join.CommunityDetail && join.CommunityDetail.id == allData.communityDetail.id).length > 0 &&

                  <div className=" bg-white rounded-lg p-6 shadow-md mb-4">
                    <p className="text-[#272727] font-semibold text-[18px] mb-4">Create a Post</p> 
                    <form onSubmit={postData}>
                      <div className="relative flex gap-x-4 border-b-2 ">
                      {profile && profile.photo ?
                        <Image src={profile.photo} alt="" width={60} height={60} className=" w-[40px] rounded-full h-[40px] object-cover" /> :
                        <Image src="/images/userPhoto.png" width={60} height={60} className="rounded-full w-[40px] h-[40px] object-cover" alt=""/>
                        }
                        <textarea required placeholder="Type something to share with community" rows="4" ref={communityMsg} className="w-full outline-none"></textarea>
                      </div>
                      <div className="flex justify-between mt-4">
                        <input type="file" onChange={(e) => {
                                    const fileName = e.target.files[0]?.name;
                                    document.getElementById("file-name").textContent = fileName;
                                }} ref={communityImg} target='_blank' id="photo_add" className='text-center py-2 text-[#535353]  items-center gap-2 hidden' />
                        <label htmlFor="photo_add" className="cursor-pointer flex items-center gap-x-[8px]"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g ><path d="M7.006 13.997H1.674C.669 13.997 0 13.28 0 12.203V1.79C0 .716.67-.002 1.675-.002H12.34c.984 0 1.66.724 1.66 1.781v10.44c0 1.056-.675 1.776-1.663 1.777-1.776.003-3.553.004-5.33.001Zm.104-1.568c1.576 0 3.153.006 4.73-.008.164 0 .401-.072.464-.194.062-.12-.014-.374-.104-.516a113.815 113.815 0 0 0-1.591-2.438c-.295-.444-.674-.479-1.04-.105-.21.216-.403.45-.618.66-.332.323-.71.292-1.003-.075-.06-.074-.114-.152-.17-.23-.795-1.11-1.589-2.224-2.39-3.332-.366-.507-.674-.478-.94.083-.841 1.773-1.681 3.547-2.52 5.322-.262.556-.103.832.478.833 1.569.002 3.137.003 4.704.002v-.002Zm.422-8.3c-.005.216.03.43.104.632.073.201.184.385.324.54.141.155.31.278.495.364a1.443 1.443 0 0 0 1.179.01 1.52 1.52 0 0 0 .5-.356c.143-.152.256-.334.332-.534.077-.2.115-.413.114-.63.005-.215-.03-.43-.104-.63a1.642 1.642 0 0 0-.325-.54 1.526 1.526 0 0 0-.494-.364 1.443 1.443 0 0 0-1.179-.01 1.521 1.521 0 0 0-.5.355 1.638 1.638 0 0 0-.333.534 1.72 1.72 0 0 0-.113.63Z" fill="#6CA153" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h14v14H0z" /></clipPath></defs></svg> <span  id="file-name" >Photo</span></label>
                        <button type="submit" className='min-w-[120px] bg-[#20C4C8] text-center py-2 text-white border-[#20C4C8] font-semibold  border-2  rounded '> Post</button>
                      </div>
                    </form>
                  </div>}

                </>

            }


{
              !router.query.id &&
            <div className="flex gap-2 items-center mb-4">
              <p className=" text-[14px] me-4 text-[#535353]">Sort by</p>
              <button onClick={() => popularity(1)} className={`${popularityBtn == 1 ? 'bg-[#20C4C8]  text-[#fff] ' : 'bg-[#D3E9EA]  text-[#60898B]'} rounded-full text-[14px]  py-[5px] px-[40px] `}>Latest</button>
              <button onClick={() => popularity(2)} className={`${popularityBtn == 2 ? 'bg-[#20C4C8]  text-[#fff]' : 'bg-[#D3E9EA]  text-[#60898B]'} rounded-full text-[14px]  py-[5px] px-[40px]  `}>Popularity</button>
            </div>
}
            {
              popularityCommunity && 
              hidePostList && hidePostList.length > 0 ?
              popularityCommunity.filter(hideItem =>  !hidePostList.map(({communityPostId}) => communityPostId).includes(hideItem.id)).map((item, index) => (
                <PostCard data={item} updateFunction={updatePage} key={`postCard-${index}`} comID={allData.communityDetail.id} profileId= {profile && profile.id}  />
              )):
              popularityCommunity.map((item, index) => (
                <PostCard data={item} updateFunction={updatePage} key={`postCard-${index}`} comID={allData.communityDetail.id} profileId= {profile && profile.id}    />
              ))
            }

          </div>
         
          <div className="w-3/12">
            <div className="sticky top-4">
              <div className=" bg-white rounded-lg p-6 shadow-md ">
                <h2 className="text-[18px] font-medium mb-2">Search Community</h2>

                <div className='relative'>
                  <svg width="16" height="16" className="absolute left-3 top-[50%] -translate-y-[50%]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#929292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.0004 18.9999L14.6504 14.6499" stroke="#929292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input type='text' onChange={searchResult} placeholder='Search for Hair Loss, Diabetes etc' className='w-full text-[#848484] ps-9 pe-4  border-2 border-[#DFDFDF] bg-white outline-0 py-3 text-[14px]  rounded-lg ' />
                </div>
                <div className="flex mt-4 flex-wrap items-center gap-2">

                  {
                    searchCommunity &&
                    searchCommunity.map((item, index) => (
                      <a href={item.slug} key={`item-${index}`} className="rounded-full text-[12px] bg-main py-[6px] px-[10px] text-[#60898B]">{item.title}</a>
                    ))
                  }
                </div>
              </div>
              <div className=" bg-white rounded-lg mt-4 p-6 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="text-center w-[20%]">
                    <Image src="/images/people.png" width={30} height={30} className="object-contain h-[32px] m-auto mb-1" alt="" />
                    
                  </div>
                  <h2 className=" text-[#6A6A6A] text-[14px]  w-[70%]">Number of People who have joined this community</h2>{
                      allData.totalMember &&
                      <span className="text-[#434343] font-medium w-[10%] text-right" >{allData.totalMember[0].total}</span>
                    }

                </div>
              </div>
              <div className="   mt-4 p-6 py-3 bg-[#20C4C8] text-[#fff]  font-medium  rounded">
                <div className="text-center  items-center gap-2">
                  <Link href={`/disease/${allData.communityDetail.slug}`}>Explore More</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>



    </PageLayout>
  )
}
export async function getServerSideProps({ params}) {
  // const id = query.id 
  const res = await fetch(`${process.env.apiUrl}/community/communityPostList?slug=${params.feedDetail}`)

  const data = await res.json()

  // console.log(data.result.allPostList);
  const allData = data.result
  return {
    props: {
      allData: allData
    },
  }
}  
