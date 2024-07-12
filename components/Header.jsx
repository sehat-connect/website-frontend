
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Fragment } from 'react'
import { Router, useRouter } from 'next/router'
import Logo from '../public/images/logo.png'
import AuthContext from './Auth/Auth'
import Ajax from './Helper/Ajax'
import { toast } from 'react-toastify';
import NoImage from './NoImage'



export default function Header({login,headerClass}) {

  const router = useRouter();
  const Auth = useContext(AuthContext)
  const [loginMenu,setLoginMenu] = useState(false);
 
// console.log(Auth.isLoggedIn)

const menuHandler = (value) =>{
  // setsideMenus(value)
  if(value){
    setsideMenus(true)
    document.querySelector("body").classList.add('overflow-hidden')
    document.querySelector(".menu_side").classList.add('bg-main-red')
  }else{
    setsideMenus(false)
    document.querySelector("body").classList.remove('overflow-hidden')
    document.querySelector(".menu_side").classList.remove('bg-main-red')
  }
}
const [sideMenus, setsideMenus] = useState(false);

const routers = useRouter(); 

useEffect(() => {
  if (setsideMenus) {
    setsideMenus(false);
    document.querySelector("body").classList.remove('overflow-hidden')
    document.querySelector(".menu_side").classList.remove('bg-main-red')
  }
}, [routers.asPath]);



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



const userLogout = async() => {

  const action = {
    url2: `/user/logout`,
    loader: true,
    token: true,
  }
  const formSendStatus = await Ajax(action)
  console.log(formSendStatus.data)
  if(formSendStatus.data.status === true){
      const today = new Date()
      const tomorrow = new Date()
      tomorrow.setDate(today.getDate() - 100)
      document.cookie = `token=;path=/;expires=${tomorrow}`;
      Auth.setLogin(false)
      Auth.setUserData(false)
      toast.success('Logging Out..')
      router.push('/login')
      // console.log('SUCCESS')
      // console.log(formSendStatus.data)
  }
  else{
      console.log(formSendStatus.data)
  }
}


  return (
    <>
    {
      !Auth.isLoggedIn ?
    
    <div className={`py-4 px-4  w-full left-0  ${headerClass ? headerClass : 'bg-main'} `} >
      <div className='container '>
          
        <div className='flex justify-between w-full items-center'>
            <div className='flex'>
                <Link href="/" >
                <Image alt="" src={Logo}   className='w-[160px] h-[50px] object-contain'/></Link>
                <div className={`${sideMenus ? 'flex fixed z-10 bg-white pt-10': "hidden" } sm:flex transition-all flex-col sm:flex-row px-[25px]  gap-0 sm:gap-6 items-start sm:items-center  sm:w-auto w-full bg-main-red sm:bg-[transparent] h-[100%] top-0 left-0 overflow-auto`}>                
                    <Link href="/ABDM" className='text-[#384144] font-medium block  py-4'>ABDM</Link> 
                    <Link href="/community-list" className='text-[#384144] font-medium block  py-4'>Community</Link> 
                    <Link href="/about" className='text-[#384144] font-medium block  py-4'>About Us</Link> 
                </div>
            </div>
          <div className='  gap-3 items-center hidden sm:flex' >
            
            <Link href="/login" className='transition-all duration-500 hover:bg-[#20C4C8] hover:text-[#fff] w-[160px] text-center py-2  text-[#20C4C8] border-[#20C4C8] font-semibold border-2  rounded '> Login</Link>
            <Link href="#" target='_blank' className='transition-all duration-500 hover:bg-transparent hover:text-[#20C4C8] w-[160px] bg-[#20C4C8] text-center py-2 text-white border-[#20C4C8] font-semibold  border-2  rounded '> Download App</Link>
            

          </div>
          
          <div className='grid gap-2 relative w-[25px] sm:hidden z-[10] menu_side' onClick={()=>menuHandler(!sideMenus)}>
            <span className='h-[1px] bg-[#000]'></span>
            <span className='h-[1px] bg-[#000]'></span>
            <span className='h-[1px] bg-[#000]'></span>
          </div>
        </div>
        
      </div>
    </div>  


    :
    <div className='py-4  w-full '>
      <div className='container '>
          
        <div className='flex justify-between w-full items-center'>
            <div className='flex'>
                <Link href="/" >
                <Image alt="" src={Logo}   className='w-[120px] h-[40px] sm:w-[160px] sm:h-[50px] object-contain'/></Link>
                <div className={`${sideMenus ? 'flex fixed z-10 bg-white pt-10': "hidden" } sm:flex transition-all flex-col sm:flex-row px-[25px]  gap-0 sm:gap-6 items-start sm:items-center  sm:w-auto w-full bg-main-red sm:bg-[transparent] h-[100%] top-0 left-0 overflow-auto`}>                
                <Link href="/ABDM" className='text-[#384144] font-medium block  py-4'>ABDM</Link> 
                    <Link href="/community-list" className='text-[#384144] font-medium block  py-4'>Community</Link> 
                    <Link href="/about" className='text-[#384144] font-medium block  py-4'>About Us</Link> 
                </div>
            </div>
          <div className='flex relative gap-3 items-center' >
          
            <div role="button" className='text-[#384144] font-medium flex gap-2 items-center' onClick={()=>setLoginMenu(!loginMenu)}> {profile && profile.firstName ?
             <p className='text-[#384144] font-medium flex gap-2 items-center'> Hi,   {profile && profile.firstName && profile.firstName}   {profile && profile.lastName && profile.lastName} </p>
              :<p className='text-[#384144] font-medium flex gap-2 items-center'> Hi,  User</p>
            }
            {profile && profile.photo ? <Image src= {profile.photo} width={50} height={50} alt='' className='object-cover rounded-full w-[25px] h-[25px]'/>
            :
            // <NoImage width={50} height={50} alt='' className='object-contain w-[25px] h-[25px]' />
            <Image src="/images/userPhoto.png" width={50} height={50} className="object-cover rounded-full w-[25px] h-[25px]" alt=""/>
            }
              <svg className={`${loginMenu ? 'rotate-180' : 'rotate-0'  } transition-all`}  width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m3.5 0 3.031 3.75H.47L3.5 0Z" fill="#384144"    /></svg>
            </div>

            <div className={`${loginMenu ? '' : 'hidden'  } absolute bg-white shadow-md w-[180px] p-4 right-0 top-[40px] z-50 rounded-lg border-2 `} >
              <Link href="/profile" className='flex items-center gap-2 font-medium text-[#484848] mb-2 border-b-2 pb-2 text-[14px]' ><svg width="14" height="14" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" fill="#868686"><path d="M4.502 10.178H.42c-.343 0-.435-.097-.418-.436.088-1.84 1.37-3.341 3.244-3.634 1.059-.164 2.154-.206 3.2.166 1.506.535 2.537 1.974 2.556 3.54.003.257-.104.362-.377.362-1.375.002-2.75.002-4.123.002ZM1.799 2.621C1.814 1.14 3.03-.013 4.565.001c1.445.011 2.65 1.224 2.636 2.65-.016 1.483-1.232 2.635-2.767 2.622C2.99 5.26 1.784 4.047 1.8 2.62Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h9v10H0z"/></clipPath></defs></svg>Profile</Link>
              
              <button onClick={userLogout} className='flex items-center gap-2 font-medium text-[#484848] text-[14px] ' ><svg width="14" height="14" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" fill="#868686"><path d="M3.89.828c.13.066.21.101.282.148.3.191.414.465.413.792-.002 1.968-.002 3.935 0 5.902v.244c.497 0 .974.016 1.449-.006.242-.012.369-.188.37-.43.004-.528 0-1.056.003-1.583.003-.28.172-.456.433-.467.261-.012.477.131.481.374.01.638.026 1.278-.029 1.912-.05.587-.655 1.033-1.3 1.04-.456.006-.914 0-1.407 0v.35c-.01.667-.589 1.046-1.285.837a435.44 435.44 0 0 1-2.618-.794C.227 9.007 0 8.72 0 8.282V.895C.001.35.381 0 .973 0H5.91c.803 0 1.4.523 1.421 1.255.012.397.007.795 0 1.192-.004.28-.195.47-.457.473-.27.003-.464-.195-.467-.484-.004-.391 0-.782-.003-1.173-.004-.253-.172-.425-.449-.43C5.347.822 4.738.83 4.13.83h-.24Z"/><path d="M8.243 4.58c-.624 0-1.215.004-1.807 0-.275 0-.451-.141-.473-.36-.027-.266.166-.463.469-.465.593-.004 1.185 0 1.812 0V2.507a.37.37 0 0 1 .07-.232.43.43 0 0 1 .205-.153.46.46 0 0 1 .495.081c.619.56 1.234 1.121 1.845 1.686.181.167.187.39.004.56a167.56 167.56 0 0 1-1.846 1.686.43.43 0 0 1-.23.117.454.454 0 0 1-.263-.033c-.189-.078-.28-.213-.28-.401V4.581Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h11v10H0z"/></clipPath></defs></svg>Logout</button>
            </div>
            </div>
          {/* <div className='grid gap-2 relative w-[25px] sm:hidden z-[10] menu_side' onClick={()=>menuHandler(!sideMenus)}>
            <span className='h-[1px] bg-white'></span>
            <span className='h-[1px] bg-white'></span>
            <span className='h-[1px] bg-white'></span>
          </div> */}
          
          <div className='grid gap-2 relative w-[25px] sm:hidden z-[10] menu_side' onClick={()=>menuHandler(!sideMenus)}>
            <span className='h-[1px] bg-[#000]'></span>
            <span className='h-[1px] bg-[#000]'></span>
            <span className='h-[1px] bg-[#000]'></span>
          </div>

        </div>
        
      </div>
    </div> }
    </>
  )
}

