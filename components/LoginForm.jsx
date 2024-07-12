import React, {useState, useEffect, useContext} from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Ajax from './Helper/Ajax';
import { useRouter } from 'next/router';
import AuthContext from './Auth/Auth';

const LoginForm = () => {
const Auth = useContext(AuthContext)
const [showOtp, setShowOtp] = useState(0);
const [loginValue, setLoginValue] = useState('')

const sendOtp = async(values) =>{

    // console.log(values.user_info)
    const formDataFormat = {
        "number" : `${values.user_info}`
    }
    // formDataFormat.append("user_info", values.user_info)
    const action = {
        method: 'POST',
        url2: '/user/sendOtp',
        data: formDataFormat,
    }
    const formSendStatus = await Ajax(action)
    // console.log(formSendStatus)
    if(formSendStatus.data.result){
        toast.success('OTP Sent')
        setShowOtp(1);
        setLoginValue(values.user_info)
    }
    else{
        toast.error('OTP Not Sent')
    }
}

const router = useRouter();

const verifyOtp = async(values) =>{
    // const formDataFormat = new FormData()
    const formDataFormat = {
        "number" : `${values.user_info}`,
        "token" : values.otp
    }
    // formDataFormat.append("number", values.number)
    // formDataFormat.append("otp",values.otp)
    const action = {
        method: 'POST',
        url2: '/user/verifyOtp',
        data: formDataFormat,
    }
    const formSendStatus = await Ajax(action)
    console.log("userData" , formSendStatus)
    if(formSendStatus.data.status === "SUCCESS!"){
        toast.success('OTP Verified')
        const today = new Date()
        const tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 5)
        document.cookie = `token=${formSendStatus.data.token.token};path=/;expires=${tomorrow}`;
        Auth.setLogin(true)
        Auth.setUserData({name:'kartik'})
        Auth.setIsVerified(true)
        if(router.query.url && formSendStatus.data.token.firstName ){
            router.push(`/feed/${router.query.url}`)
        }else if(formSendStatus.data.token.firstName){
            router.push('/community-list')
        }else{
            router.push('/profile')
        }
        // router.push(router.query.returnUrl || '/feed/asthma')
    }
    else{
        toast.error('OTP verification Failed')
    }
}

  return (
    <>
    
    {showOtp === 0 && 
    <Formik key={'otpField'}
    initialValues={{ user_info: ""}}
    validationSchema={Yup.object({
        user_info: Yup.string().min(10, 'please enter a valid mobile no.').max(10, 'please enter a valid mobile no.').required('please enter a valid mobile no.'),
    })}
    onSubmit={(values , {resetForm}) => {
        sendOtp(values)
        resetForm()
    }}
    >   
    <Form>
        <p className="text-[#535353] my-4">We will send you <strong>One Time Password(OTP)</strong> to mobile number entered</p>
        
        <div className="login-form">
            <div className="row">
                <div className="form-field col-lg-12">
                    <Field type="number" name="user_info" className="form-control phone with-country-code w-full text-[#848484] px-5 border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg" />
                    <div className="error">
                    <ErrorMessage name="user_info" />
                    </div>
                </div>
                <div className="col-12 mt-4 text-center">
                    <button type="submit" className='w-[100%] bg-[#20C4C8] text-center py-3 m-auto text-white border-[#20C4C8] font-semibold  border-2  rounded '>Get OTP</button>
                </div>
            </div>
        </div>
    </Form>
    </Formik> }

    { showOtp !== 0 && loginValue !== '' && 
    <Formik key={'asotpField'}
        initialValues={{ user_info: loginValue,  otp: ""}}
        enableReinitialize={true}
        validationSchema={Yup.object({
            user_info: Yup.string().required('Required'),
            otp: Yup.string().required('Required'),
        })}
        onSubmit={(values , {resetForm}) => {
            verifyOtp(values)
            resetForm()
        }}
    >     
        <Form>
    <p className="text-[#535353] my-4 ">Enter the 6 digit code sent to mobile number <br /><strong>{loginValue}</strong></p>
        <div className="login-form">
            <div className="row">
                <div className="form-field col-lg-12">
                    <Field name="otp" className="form-control w-full text-[#848484] px-5 border-2 border-[#C6C6C6] my-4 outline-0 p-4 rounded-lg" id="otp" />
                    <div className="error">
                    <ErrorMessage name="otp" />
                    </div>
                    <Field name="user_info" type="hidden" />
                </div>
                <div className="col-12 mt-4 text-center">
                    <button type="submit" className='btn theme_btn fullwidth w-full bg-[#20C4C8] text-center py-3 m-auto text-white border-[#20C4C8] font-semibold  border-2  rounded '>Login</button>
                </div>
            </div>
        </div>
        </Form>
    </Formik>
}
    </>
  )
 
}

export default LoginForm