import Header from '@/components/Header'
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PageLayout({children,description,keyword,title,login,headerClass}){
    return(
        <>
            <Head>
                <title>{title ? title : 'Sehat Connect'}</title>
                <meta name="description" content={description ? description : 'Sehat Connect'} />
                <meta name="keywords" content={keyword ? keyword : "Sehat Connect"} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header login={login} headerClass={headerClass} />
           
                <div className='form-loader'>
                    <span className="loader"></span>
                </div>
                {children}
            <Footer/>
      <ToastContainer />

            
        </>

    );
    



}

export default PageLayout;