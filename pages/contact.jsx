import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import NoImage from "@/components/NoImage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import Ajax from "@/components/Helper/Ajax";
import { toast } from 'react-toastify';


export default function Contact({allData}) {


  
  const contactForm = async (values) => {

    const formDataFormat = {
      "firstName": values.first,
      "lastName": values.last,
      "phone": values.contact,
      "email": values.email,
      "communityId": values.communityId,
      "message": values.message,
    };
    const action = {
      method: 'POST',
      url2: '/contact/enquiry',
      data: formDataFormat,
      token: true,
    }

    const formSendStatus = await Ajax(action)
    if (formSendStatus.data.status === "SUCCESS!") {
      toast.success('Form Submit')
      // setTimeout(() => {
      //   router.reload()
      // }, 2000);

    }
    else {
      toast.error('Error')
    }

  }



  return (
    <PageLayout  title="Contact | Sehat Connect">

      <section className="bg-main sm:h-[360px] h-[160px] flex items-center text-center">
        <div className="container">
          <div className="w-2/3 m-auto">
            <h1 className="sm:text-[60px] text-[38px] font-semibold text-[#272727] leading-tight mb-6">{allData.title}</h1>

          </div>
        </div>
      </section>
      
      <section className="py-10 relative overflow-hidden">
        <div className="container px-4">
            <div className="w-3/4 m-auto">
                <p className="text-center sm:text-[30px] text-[24px] font-medium text-[#272727] mb-10">{allData.title1}</p>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 ">
                  <div className="text-center ">
                    <Image src={allData.file} alt="" width={500} height={500}  className="w-[100%] h-[400px] object-contain " />
                  </div>
                  <div className="">
                    <Formik 
                    
                        initialValues={{ 
                          first: '', 
                          last: '' ,
                          contact: '',
                          email: '', 
                          communityId: '', 
                          message: '' ,
                      }}
                      validationSchema={Yup.object({
                          first: Yup.string()
                          .required('Field is Required'),
                          last: Yup.string()
                          .required('Field is Required'),
                          contact: Yup.string()
                          .max(10, 'Phone number should be 10 digit')
                          .min(10, 'Phone number should be 10 digit')
                          .required('Field is Required'),
                          email: Yup.string().email('Invalid email address').required('Field is Required'),
                      })}
                        onSubmit={(values , {resetForm}) => {
                            // alert(JSON.stringify(values));
                            contactForm(values)
                            resetForm()
                        }}>
                        <Form >
                            <div className="grid sm:grid-cols-2 grid-cols-1  gap-x-6">
                                <div className="mb-3">
                                    <label  htmlFor="first" className=" text-[#272323] text-[16px] font-semibold">First Name <span className="font-bold text-[#C91A20]">*</span></label>
                                    <Field id="first" placeholder="Your first name here" name="first" className='w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    <span  className=" text-[#C91A20]"><ErrorMessage name="first"/></span>
                                </div>
                                <div className="mb-3">
                                    <label  htmlFor="last" className=" text-[#272323] text-[16px] font-semibold">Last Name <span className="font-bold text-[#C91A20]">*</span></label>
                                    <Field id="last" placeholder="Your last name here"  name="last" className='w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    <span  className=" text-[#C91A20]"><ErrorMessage name="last"/></span>
                                </div>
                                <div className="mb-3">
                                    <label  htmlFor="email" className=" text-[#272323] text-[16px] font-semibold">Email<span className="font-bold text-[#C91A20]">*</span></label>
                                    <Field id="email" placeholder="Your email address" type="email"  name="email" className='w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    <span  className=" text-[#C91A20]"><ErrorMessage name="email"/></span>
                                </div>
                                <div className="mb-3">
                                    <label  htmlFor="contact" className=" text-[#272323] text-[16px] font-semibold">Contact<span className="font-bold text-[#C91A20]">*</span></label>
                                    <Field id="contact" placeholder="Your contact number"  name="contact" className='w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                    <span  className=" text-[#C91A20]"><ErrorMessage name="contact"/></span>
                                </div>
                                {/* <div className="mb-3 col-span-2 " >
                                    <label  htmlFor="communityId" className=" text-[#272323] text-[16px] font-semibold">Related to <span className="font-bold text-[#C91A20]">*</span></label>
                                    <Field as='select' id="communityId" name="communityId" className='w-full rounded-lg border-2 outline-0 mt-2 p-3 ' >
                                        <option selected="selected" disabled value="">Select</option>
                                        <option value="1">Community 1</option>
                                        <option value="2">Community 2</option>
                                    </Field>
                                </div> */}
                            </div>
                                <div className="mb-3">
                                    <label htmlFor="message"  className=" text-[#272323] text-[16px] font-semibold">Message</label>
                                    <Field as="textarea" rows="3" id="message" name="message" className='w-full rounded-lg border-2 outline-0 mt-2 p-3 ' />
                                </div>
                            <div className="text-center">
                                <button type="submit" className="min-w-[220px] bg-[#20C4C8] text-center py-3 inline-block  px-4 text-white border-[#20C4C8] font-semibold  border-2  rounded" >Send</button>
                            </div>
                        </Form>
                    </Formik>


                  </div>
            </div>


        </div>
      </section>

      <section className="py-10 relative overflow-hidden">
        <span className="absolute w-[300px] h-[300px] -left-40 top-20 bg-circler rounded-full"></span>
        <span className="absolute w-[300px] h-[300px] -right-40 bottom-20 bg-circler rounded-full rotate-180"></span>
        <div className="container px-4">
            <div className="sm:w-2/3 w-full ">
                <h2 className="sm:text-[40px] text-[28px] font-bold mb-4 text-[#272727] leading-tight">{allData.title2}</h2>
                <div className="sm:text-[18px] text-[16px]  text-[#535353]" dangerouslySetInnerHTML={{__html:allData.description}}></div>
            </div>
        </div>
      </section>



    </PageLayout>
  );
}


export async function getStaticProps() {
  const res = await fetch(`${process.env.apiUrl}/contact/pageData`)
  const data = await res.json()

  const allData = data.result.meta
 
  return { 
      props: {
          allData: allData
      },revalidate: 10,
  }
}  


