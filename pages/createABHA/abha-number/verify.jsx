"use client";
import Image from "next/image";
import { React, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as yup from "yup";
import { getCookie, setCookie } from 'cookies-next';


import { GenerateOTP } from "@/components/ABHAAddress/Mobile/GenerateOtp";
export default function Index() {
    const router = useRouter()
    const params = router.query;
    const Auth_Token = getCookie('Auth_Token')

    const resendOtp  = async () => {
        const res = await fetch(
            `${process.env.webUrl}/api/abdm/CreatePhrWithABHA/ResendOtp`,
            {
                method: "POST",
                body: JSON.stringify({
                    transactionId: params.transactionId,
                    "Auth_Token": Auth_Token
                }),
            }
        );
        if (res.status === 200) {
            alert('OTP sent successfully')
           
        } else {
            alert("Something went wrong. Please try again");
        }
    }
    const formik = useFormik({
        initialValues: {
            mobileOtp: "",
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const res = await fetch(
                `${process.env.webUrl}/api/abdm/CreatePhrWithABHA/VerifyOtp`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        "otp": values.mobileOtp,
                        transactionId: params.transactionId,
                        "Auth_Token": Auth_Token
                    }),
                }
            );
            if (res.status === 200) {
                const data = await res.json()
                router.push({
                    pathname: '/createABHA/abha-address/create/abha-number/register',
                    query: {
                        transactionId: data.transactionId
                    },
                },
                );  
            } else {
                alert("Something went wrong. Please try again");
            }
        },
        validationSchema: yup.object({
            mobileOtp: yup.string().min(6).max(6).required("This field is required"),
        }),
    });

    return (
        <PageLayout
            title="Feeds | Healthy Habits,  Strong Community"
            login={false}
        >
            <section className="bg-white py-16 min-h-[600px] flex align-middle justify-center">
                <div className=" flex flex-wrap">
                    <div className="w-full grid grid-cols-1 overflow-hidden">
                        {/* <div className="relative bg-[#20C4C8] text-center  overflow-hidden">
                            <p className="relative mb-4 text-[34px] font-medium text-white w-[60%] py-[40px] m-auto leading-[1.2]">
                                Create ABHA Address Using Mobile Number
                            </p>
                            <Image
                                src="/images/create.png"
                                width={550}
                                height={450}
                                className="relative object-contain m-auto "
                                alt=""
                            />
                        </div> */}
                        <div className=" bg-[#fff] rounded-e-xl grid place-content-center px-[120px]">
                            <h4 className="text-[34px] font-medium text-center mb-8 text-black">
                                Create ABHA Number
                            </h4>
                            <h4 className="text-[16px] font-medium text-left text-black">
                                Verify OTP sent to your Aadhaar linked mobile number {params.mobileNumber}
                            </h4>
                            <form onSubmit={formik.handleSubmit} className=" w-[600px]">
                                <div className="form__input__wrapper">
                                    
                                    <input
                                        id="mobileOtp"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.mobileOtp &&
                                            formik.errors.mobileOtp &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("mobileOtp")}
                                        placeholder="6 digit OTP"
                                    />
                                    {formik.touched.mobileOtp && formik.errors.mobileOtp ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.mobileOtp}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="mt-2 font-semibold text-right text-blue-500 text-sm cursor-pointer" onClick={() => {
                                    resendOtp()
                                }}>Resend OTP</div>

                                <div className="text-right form__input__wrapper mt-8">
                                    <button
                                        type="submit"
                                        className={`uppercase py-2 px-10 rounded-lg text-base font-medium form__submit  ${
                                            formik.isValid && formik.dirty
                                                ? ""
                                                : "form__submit__disabled"
                                        }`}
                                        disabled={!(formik.isValid && formik.dirty)}
                                    >
                                        {!formik.isSubmitting ? <span>Next</span> : ""}
                                        {formik.isSubmitting ? <span>Loading....</span> : ""}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
