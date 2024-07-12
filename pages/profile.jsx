import Image from "next/image";
import { Inter } from "next/font/google";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CommunitySide from "@/components/CommunitySide";
import Ajax from "@/components/Helper/Ajax";
import { ErrorMessage, Field, Form, Formik } from "formik";
import NoImage from "@/components/NoImage";
import PostCardPro from "@/components/PostCardPro";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


export default function Community({allData}) {

    

const [profile, setProfile] = useState(null)
const router = useRouter();
    
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
                setJoinCom(response.data.result.allJoinCommunity)
            }
            
            })()
        },100) 
          return()=>{
            clearInterval(getResponse)
          }
    },[])


    
  const [totalPost, setTotalPost] = useState(null)
    
  console.log(joinCom)
    useEffect(()=>{
        const getResponse = setTimeout(function(){  
            (async()=>{ 
            const response = await Ajax({
                url2: `/community/communityPost`,
                token: true,
            })
            if(response.data.status === "SUCCESS!"){
                setTotalPost(response.data.result)
            }
            
            })()
        },100) 
          return()=>{
            clearInterval(getResponse)
          }
    },[])


    const profileImage = useRef()
    
    const dob = useRef()
    
  const profileUpdate = async (values) => {
    // e.preventDefault();
    if(profile.id){

      const formDataFormat = new FormData();
      // if(profileImage != null){
      //   formDataFormat.append("file", profileImage)
      // }
          formDataFormat.append("firstName", values.firstName)
          formDataFormat.append("lastName", values.lastName)
          formDataFormat.append("gender", values.gender)
          formDataFormat.append("dob", dob.current.value)
          formDataFormat.append("phone", values.phone)
          if(values.email && values.email != ""){
            formDataFormat.append("email", values.email)
          }
          // if(values.phone && values.phone != ""){
          // }
          if(profileImage.current.files[0]){
            formDataFormat.append("file", profileImage.current.files[0])
          }
          const action = {
            method: 'PUT',
            url2: `/user/profile/${profile.id}`,
            data: formDataFormat,
            token: true,
            loader: true,
          }

          const formSendStatus = await Ajax(action)
          if (formSendStatus.data.status === "SUCCESS!") {
            toast.success('Update Profile')

            setTimeout(() => {
              router.reload()
            }, 2000);

          }
          else {
            toast.error('Error')
          }

    }
    
  }



  return (
    <PageLayout  title="Feeds | Healthy Habits,  Strong Community" login={true}>

      <section className="bg-main pt-6">
        <div className="container flex flex-wrap">

        <CommunitySide data={allData.AllCommunityList} />
          {/* <div className="w-3/12 pe-6 ">
            <div className=" bg-white rounded-lg p-6 min-h-[280px] shadow-md sticky top-4 ">
                <Link href='' className="flex gap-2 items-center mb-4 pb-4 border-b-2">
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.122 15v-3.5c0-.5-.153-.957-.533-1.272-.272-.223-.615-.464-.945-.494a11.257 11.257 0 0 0-2.32-.004c-.874.1-1.467.868-1.471 1.744-.008 1.038 0 2.078 0 3.118v.374c-.838 0-1.646.03-2.45-.013-.386-.02-.617-.407-.617-.862V8.784c0-.569-.154-.72-.734-.72-.177 0-.371.044-.529-.012-.191-.066-.437-.186-.503-.346-.066-.16.051-.403.105-.605.015-.056.089-.096.133-.143L6.931.324c.434-.432.682-.432 1.118 0 2.232 2.22 4.462 4.442 6.69 6.668a.997.997 0 0 1 .26.569c.025.276-.219.482-.515.499-.221.012-.444 0-.667.004-.442.006-.623.183-.623.627v5.241c0 .778-.282 1.062-1.058 1.062-.656.007-1.311.006-2.014.006Z" fill="#20C4C8"/></svg><span className="text-[#20C4C8] text-[18px] font-medium">Home</span></Link>
                <Link href='' className="flex gap-2 items-center mb-4 ">
                    <svg width="20" height="20" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g  fill="#868686"><path d="M7.84 6.627c.25.28.451.53.677.756.406.408.954.634 1.522.628a2.12 2.12 0 0 0 1.51-.658 2.22 2.22 0 0 0 .614-1.559 2.221 2.221 0 0 0-.643-1.546c-.607-.617-1.222-1.224-1.833-1.839a.506.506 0 0 1-.049-.076C10.578 1.27 11.55.295 13.043.05c2.25-.368 4.565 1.326 4.901 3.64.225 1.547-.215 2.854-1.295 3.991-.558-.542-1.209-.742-1.942-.576-.732.167-1.19.675-1.456 1.383-.948-.291-1.762-.101-2.357.715-.55.752-.524 1.557-.057 2.376-.086.054-.173.109-.26.161-.884.531-1.24 1.53-.878 2.507.07.18.07.293-.08.432-.343.326-.663.678-.999 1.013-.379.379-.823.402-1.15.068-.325-.333-.304-.792.061-1.175.312-.325.633-.644.944-.969.31-.324.356-.72.095-.978s-.599-.227-.923.101c-.325.33-.644.665-.971.992-.364.36-.84.373-1.153.036-.313-.337-.281-.784.07-1.152.329-.343.666-.677.994-1.02.3-.313.323-.655.07-.922s-.62-.238-.928.072c-.351.354-.694.715-1.046 1.067-.34.34-.732.355-1.02.047-.288-.308-.26-.678.07-1.017C5.077 9.462 6.426 8.08 7.84 6.627Z"/><path d="M3.375 9.485c-.81-.8-1.647-1.522-2.364-2.353A4.2 4.2 0 0 1 .003 4.225 4.183 4.183 0 0 1 1.24 1.412C2.81-.14 5.26-.195 6.864 1.335 8.157 2.568 9.407 3.85 10.667 5.12c.417.42.413 1.016.018 1.41-.37.366-.955.352-1.357-.04-.203-.2-.397-.409-.598-.61-.562-.56-1.282-.563-1.838.004-1.163 1.184-2.319 2.373-3.517 3.601Zm9.257.102c.089.05.298.116.44.255a69.62 69.62 0 0 1 1.763 1.8.814.814 0 0 1 .247.575.831.831 0 0 1-.227.584c-.325.345-.796.36-1.152.005a106.11 106.11 0 0 1-1.784-1.828c-.244-.254-.306-.566-.155-.892.147-.315.396-.494.868-.5Zm2.56-1.363c.18.092.393.15.537.284.38.352.74.73 1.094 1.11.337.36.334.816.014 1.152-.33.347-.792.354-1.152 0a34.112 34.112 0 0 1-1.089-1.116.782.782 0 0 1-.148-.896c.136-.304.376-.479.744-.534Zm-2.795 6.836c-.633.006-1.64-1.03-1.631-1.55.005-.348.182-.587.473-.735a.682.682 0 0 1 .816.105c.296.272.578.56.844.864a.719.719 0 0 1 .098.836c-.15.296-.389.47-.6.48Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h18v16H0z"/></clipPath></defs></svg><span className="text-[18px] text-[#434343] font-medium">Joined Communities</span></Link>
                    <div className="ps-4">
                    <Link href='' className="flex gap-2 items-center mb-4">                    
                        <Image src="/images/comm8.png" width={20} height={20} className="object-contain" alt=""/><span className="text-[#434343]">Diabetes</span></Link>
                    <Link href='' className="flex gap-2 items-center mb-4">                    
                        <Image src="/images/comm7.png" width={20} height={20} className="object-contain" alt=""/><span className="text-[#434343]">Heart Health</span></Link>
                    <Link href='' className="flex gap-2 items-center mb-4">                    
                        <Image src="/images/comm6.png" width={20} height={20} className="object-contain" alt=""/><span className="text-[#434343]">Asthma</span></Link></div>
            </div>
          </div> */}

          <div className="w-6/12 pe-6">

            <div className=" bg-white rounded-lg p-6 shadow-md mb-4">
                <div className="flex gap-3 items-center justify-between"> 
                    <div className="flex items-center gap-3">     
                    {
                      profile && profile.photo && profile.firstName  ?
                      <>
                      <Image src={profile.photo} width={60} height={60} className="object-cover rounded-full w-[40px] h-[40px]" alt=""/><span className="text-[#535353] font-semibold ">{profile.firstName} {profile.lastName}</span>  </>
                      :
                      
                      <>
                      <Image src="/images/userPhoto.png" width={60} height={60} className="object-cover rounded-full w-[40px] h-[40px]" alt=""/><span className="text-[#535353] font-semibold ">User</span>  </>
                       
                    }             
                        
                    </div>
                    <div className="flex items-center gap-6">  
                        <span className="text-[#6A6A6A]  ">{joinCom && joinCom.count && joinCom.count} Communities</span>
                        <span className="text-[#6A6A6A]  ">{totalPost && totalPost.count && totalPost.count} Posts</span>
                    </div>
                </div> 
            </div>


            
            <div className=" bg-white rounded-lg p-6 shadow-md mb-4">  
                <div className="relative">
                    <p className="text-[#272727] font-semibold w-full mb-4">User Profile</p>

                    
                    <Formik  enableReinitialize = {true}
                        initialValues={{ 
                          firstName: `${profile && profile.firstName  ? profile.firstName : '' }`, 
                          lastName: `${profile && profile.lastName ? profile.lastName : '' }`, 
                          phone: `${profile && profile.phone ? profile.phone : '' }`, 
                          email: `${profile && profile.email ? profile.email : '' }`, 
                          gender: `${profile && profile.gender ? profile.gender : '' }`, 
                          // dob: `${profile && profile.dob ? profile.dob : '' }`, 
                          // file: `${profile && profile.photo ? profile.phone : '' }`,
                      }}
                        onSubmit={(values ) => {
                            // alert(JSON.stringify(values));
                            profileUpdate(values)
                            // resetForm()
                        }}>
                        <Form  className="flex flex-wrap items-start ">
                            <div className="w-2/4 gap-x-6">
                                <div className="mb-3">
                                    <label  htmlFor="firstName" className=" text-[#272323] text-[14px] font-normal">First Name </label>
                                    <Field id="firstName" placeholder="Your First name here" name="firstName"  className='text-[14px] w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    {/* <span  className=" text-[#C91A20]"><ErrorMessage name="name"/></span> */}
                                </div>
                                <div className="mb-3">
                                    <label  htmlFor="lastName" className=" text-[#272323] text-[14px] font-normal">Last Name </label>
                                    <Field id="lastName"  placeholder="Your Last name here" name="lastName"  className='text-[14px] w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    {/* <span  className=" text-[#C91A20]"><ErrorMessage name="name"/></span> */}
                                </div>
                                <div className="mb-3">
                                    <label  htmlFor="email" className=" text-[#272323] text-[14px] font-normal">Email</label>
                                    {profile && profile.email ?
                                    
                                    <Field id="email" placeholder="Your email  here" disabled  name="email" className='text-[14px] w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    :
                                    <Field id="email" placeholder="Your email  here"  name="email" className='text-[14px] w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    
                                    }
                                    {/* <span  className=" text-[#C91A20]"><ErrorMessage name="email"/></span> */}
                                </div>
                                <div className="mb-3">
                                    <label  htmlFor="phone" className=" text-[#272323] text-[14px] font-normal">Phone No.</label>
                                    {profile && profile.phone ?
                                    <Field id="phone" placeholder="Your Phone no. here" disabled  name="phone" className='text-[14px] w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    :
                                    <Field id="phone" placeholder="Your Phone no. here"   name="phone" className='text-[14px] w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    
                                    }
                                    {/* <span  className=" text-[#C91A20]"><ErrorMessage name="email"/></span> */}
                                </div>
                                <div className="mb-3">
                                    <label  htmlFor="birth" className=" text-[#272323] text-[14px] font-normal">Gender</label>
                                    <div role="group" aria-labelledby="my-radio-group" className="flex gap-4 mt-2">
                                      <label>
                                        <Field type="radio" name="gender" value="m" /> Male
                                      </label>
                                      <label>
                                        <Field type="radio" name="gender" value="f" /> Female
                                      </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label  htmlFor="birth" className=" text-[#272323] text-[14px] font-normal">Date of Birth</label>
                                    <input type="date" defaultValue={profile && profile.dob && profile.dob} placeholder="Your Date Of Birth here" ref={dob}  name="dob" className='text-[14px] w-full rounded-lg border-2 outline-0 mt-2 p-3  '/>
                                    {/* <Field id="birth" placeholder="Your Date Of Birth here"   name="dob" className='text-[14px] w-full rounded-lg border-2 outline-0 mt-2 p-3 ' /> */}
                                </div>

                            </div>

                             
                            <div className="w-2/4 flex  flex-wrap justify-between mt-4 pl-2 flex-col items-center">
                                <input type="file" ref={profileImage}  id="photo_add" name="file" className='text-center py-2 text-[#535353]  items-center gap-2 hidden' />
                                
                                {
                                    profile && profile.photo ?
                                    <Image src={profile.photo} width={100} height={100} className="object-cover rounded-full w-[100px] h-[100px]  " alt=""/>
                                    :
                                    <Image src="/images/userPhoto.png" width={100} height={100} className="object-cover rounded-full w-[100px] h-[100px] " alt=""/>
                                }  
                                    
                                <label htmlFor="photo_add" className="cursor-pointer flex items-center text-[#3c79d6] gap-x-[8px]">
                                 Upload Picture</label> 
                            </div>
                            <div className="w-full">
                                <button type="submit"  className="min-w-[140px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded" >Update</button>
                            </div>
                        </Form>
                    </Formik>
                    
                </div> 


            </div>
            
            
            <div className=" bg-white rounded-lg p-6 shadow-md mb-4">  
                <div className="relative">
                    <p className="text-[#272727] font-semibold w-full mb-4">Joined Communities</p>

                    <div className="grid grid-cols-5 gap-2">
                        { joinCom && joinCom.rows  && joinCom.rows.map((item,index)=>( 
                          
                           item.CommunityDetail && 
                            <div key={`item-${index}`} >
                                <div className="text-center border-2 rounded-lg px-2 py-4">
                                { item.CommunityDetail && item.CommunityDetail.thumbnail ?
                                    <Image src={item.CommunityDetail.thumbnail} width={60} height={60} className="object-contain m-auto mb-3 h-[40px]" alt="" />
                                    :
                                    <NoImage  width={60} height={60} className="object-contain m-auto mb-3 h-[40px]" alt=""/>
                                }
                                    <h6 className="text-[14px] text-[#414141] ">{item.CommunityDetail && item.CommunityDetail.title}</h6>
                                </div>
                              </div> 
                        )) } 
                        
                    </div>
                    
                </div> 
                
                {/* <p className="text-[#20C4C8] mt-4 font-medium flex items-center gap-2">View All <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L5.5 5L9.5 1" stroke="#20C4C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>                </svg></p> */}


            </div>


            
            <div className=" bg-white rounded-lg p-6 shadow-md mb-4">  
                    <p className="text-[#272727] font-semibold w-full mb-6">Posts</p>
                {
                totalPost &&
                totalPost.rows && 
                totalPost.rows.map((item, index) => (
                    <PostCardPro data={item}  key={`postCard-${index}`} />
                ))
                }



                {/* <p className="text-[#6A6A6A] my-4 ">{`Hello, I'm newly diagnosed with Stage 3 kidney failure. I've had diabetes for about 20 years. I'm searching...`}</p> */}

{/*                 
                <p className="text-[#20C4C8] mt-4 font-medium flex items-center gap-2">View All <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1L5.5 5L9.5 1" stroke="#20C4C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>                </svg></p> */}


            </div>
{/*             
            <div className=" bg-white rounded-lg p-6 shadow-md mb-4">  
                <p className="text-[#F43F3F] font-medium flex items-center gap-2 justify-between">Delete Account <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.25 13.5L11.75 9L7.25 4.5" stroke="#535353" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</p>


            </div> */}


          </div>

          <div className="w-3/12 hidden">
            <div className="sticky top-4">
              <div className=" bg-white rounded-lg p-6 shadow-md ">
                  <h2 className="text-[18px] font-medium mb-2">Search Community</h2>
                  
                  <div className='relative'>
                      <svg width="16" height="16" className="absolute left-3 top-[50%] -translate-y-[50%]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#929292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.0004 18.9999L14.6504 14.6499" stroke="#929292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <input type='text' placeholder='Search for Hair Loss, Diabetes etc' className='w-full text-[#848484] ps-9 pe-4  border-2 border-[#DFDFDF] bg-white outline-0 py-3 text-[14px]  rounded-lg '/>
                  </div>
                  <div className="flex mt-4 flex-wrap items-center gap-2">
                      <Link href="#" className="rounded-full text-[12px] bg-main py-[6px] px-[10px] text-[#60898B]">Diabetes</Link>
                      <Link href="#" className="rounded-full text-[12px] bg-main py-[6px] px-[10px]   text-[#60898B]">Liver Disease</Link>
                      <Link href="#" className="rounded-full text-[12px] bg-main py-[6px] px-[10px]  text-[#60898B]">Gut Health</Link>
                  </div>
              </div>
              <div className=" bg-white rounded-lg mt-4 p-6 shadow-md">
                  <div className="flex items-center gap-2">
                      <div>
                          <Image src="/images/people.png" width={30} height={30} className="object-contain h-[32px] m-auto mb-1" alt=""/>
                          <span className="text-[#434343] font-medium">2,560</span>
                      </div>
                      <h2 className=" text-[#6A6A6A] text-[14px]">People has joined this community</h2>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </section>



    </PageLayout>
  );
}



  
export async function getStaticProps() {
    const res = await fetch(`${process.env.apiUrl}/community/communityPostList`)
    const data = await res.json()
  
    const allData = data.result
   
    return { 
        props: {
            allData: allData
        },
    }
  }  

  
