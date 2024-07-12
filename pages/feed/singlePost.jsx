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
      formDataFormat.append("file", communityImg.current.files[0])


      const action = {
        method: 'POST',
        url2: '/community/communityPost',
        data: formDataFormat,
        token: true,
        loader: true,
      }

      const formSendStatus = await Ajax(action)
      if (formSendStatus.data.status === "SUCCESS!") {
        toast.success('Post Submit')

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
      url2: `/community/communityPostList?slug=${slugLink}&sort=${popularityBtn}`,
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
  }, [popularityBtn])



  function popularity(id) {
    setPopularityBtn(id)
  }




  // console.log(allData.allPostList);
  return (
    <PageLayout title="Feeds | Healthy Habits,  Strong Community">

      <section className="bg-main pt-6">
        <div className="container flex flex-wrap">

          <CommunitySide data={allData.AllCommunityList} />
         

        </div>
      </section>



    </PageLayout>
  )
}
export async function getServerSideProps({ params , query}) {
    const res = await fetch(`${process.env.apiUrl}/community/communityPostList?slug=${params.feedDetail}${query.mk ? `&id=${query.mk}` : ''  }`)
  const data = await res.json()

  const allData = data.result
  return {
    props: {
      allData: allData
    },
  }
}  
