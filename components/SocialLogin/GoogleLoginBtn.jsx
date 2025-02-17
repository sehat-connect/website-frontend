import React, {useState, useContext, useCallback} from 'react'
import { toast } from 'react-toastify';
import { LoginSocialGoogle } from 'reactjs-social-login'
import Ajax from '@/components/Helper/Ajax';
import AuthContext from '@/components/Auth/Auth';
import { useRouter } from 'next/router';

export default function GoogleLoginBtn({title, redirectUrl}) {
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState();
    const Auth = useContext(AuthContext)
    const router = useRouter();
    const onLoginStart = useCallback(() => {
 
    }, []);
    const onLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider('');
    }, []);
    const onLogout = useCallback(() => {}, []);
    const LoginWithGoogle = async(data) => {
        console.log(data)
        const loginRes = await Ajax({
            url2: '/user/register',
            method: 'POST',
            // loader: true,
            data: {
                'firstName': data.given_name,
                'lastName': data.family_name,
                'email': data.email,
            }
        })
        console.log(loginRes)
        if(loginRes.data.status === "SUCCESS!"){
            const today = new Date()
            const tomorrow = new Date()
            tomorrow.setDate(today.getDate() + 15)
            document.cookie = `token=${loginRes.data.token.token};path=/;expires=${tomorrow}`;

            Auth.setLogin(true)
            Auth.setUserData(loginRes.data.token)
            toast.success('Login successfully!',{
                autoClose: 1500
            })
            if(redirectUrl){
                setTimeout(()=>{
                    router.push(redirectUrl)
                })
            }
            else{
                setTimeout(()=>{
                    router.push('/profile/')
                    
                })
            }
        }
    }
    return (
        <>
        <LoginSocialGoogle
            // isOnlyGetToken
            client_id={process.env.googleClientId}
            onLoginStart={onLoginStart}
            // redirect_uri={process.env.GoogleRedirect}
            scope='email profile openid'
            // discoveryDocs="claims_supported"
            // access_type="offline"
            onResolve={({ provider, data }) => {
            // console.log(provider, data)
            setProvider(provider)
            setProfile(data)
            LoginWithGoogle(data)
            }}
            onReject={(err) => {
            console.log(err)
            }}
        >
        <div role="button" className='flex items-center justify-center rounded p-3 border-2 border-[#C6C6C6]'>
            <svg className='me-2' height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="#167ee6" d="m492.668 211.489-208.84-.01c-9.222 0-16.697 7.474-16.697 16.696v66.715c0 9.22 7.475 16.696 16.696 16.696h117.606c-12.878 33.421-36.914 61.41-67.58 79.194L384 477.589c80.442-46.523 128-128.152 128-219.53 0-13.011-.959-22.312-2.877-32.785-1.458-7.957-8.366-13.785-16.455-13.785z"/>
                <path fill="#12b347" d="M256 411.826c-57.554 0-107.798-31.446-134.783-77.979l-86.806 50.034C78.586 460.443 161.34 512 256 512c46.437 0 90.254-12.503 128-34.292v-.119l-50.147-86.81c-22.938 13.304-49.482 21.047-77.853 21.047z"/>
                <path fill="#0f993e" d="M384 477.708v-.119l-50.147-86.81c-22.938 13.303-49.48 21.047-77.853 21.047V512c46.437 0 90.256-12.503 128-34.292z"/>
                <path fill="#ffd500" d="M100.174 256c0-28.369 7.742-54.91 21.043-77.847l-86.806-50.034C12.502 165.746 0 209.444 0 256s12.502 90.254 34.411 127.881l86.806-50.034c-13.301-22.937-21.043-49.478-21.043-77.847z"/>
                <path fill="#ff4b26" d="M256 100.174c37.531 0 72.005 13.336 98.932 35.519 6.643 5.472 16.298 5.077 22.383-1.008l47.27-47.27c6.904-6.904 6.412-18.205-.963-24.603C378.507 23.673 319.807 0 256 0 161.34 0 78.586 51.557 34.411 128.119l86.806 50.034c26.985-46.533 77.229-77.979 134.783-77.979z"/>
                <path fill="#d93f21" d="M354.932 135.693c6.643 5.472 16.299 5.077 22.383-1.008l47.27-47.27c6.903-6.904 6.411-18.205-.963-24.603C378.507 23.672 319.807 0 256 0v100.174c37.53 0 72.005 13.336 98.932 35.519z"/>
            </svg>
            <span className='font-semibold'>{title ? title : "Login with Gmail"}</span>
        </div>
        </LoginSocialGoogle>
            {/* {provider && profile && (
                <button type="button" onLogout={onLogout}></button>
            )} */}
        </>
    )
}