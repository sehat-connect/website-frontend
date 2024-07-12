"use client";
import Image from "next/image";
import { React, useEffect, useState } from "react";
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
    const [suggestedAddress, setSuggestedAddress] = useState([])
    const suggestions  = async () => {
        const res = await fetch(
            `${process.env.webUrl}/api/abdm/Common/PhrSuggestions`,
            {
                method: "POST",
                body: JSON.stringify({
                    transactionId: params.transactionId,
                    "Auth_Token": Auth_Token
                }),
            }
        );
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            setSuggestedAddress(data)
        } else {
            
        }
    }

    useEffect(() => {
        suggestions()
    }, [])
    
    const formik = useFormik({
        initialValues: {
            abhaAddress: "",
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            const exist = await fetch(
                `${process.env.webUrl}/api/abdm/Common/CheckPhrExist?phrAddress=${values.abhaAddress}`,
            );
            
            if (exist.status === 200) {
                const data = await exist.json()
                console.log(data)
                if(!data){
                    const res = await fetch(
                        `${process.env.webUrl}/api/abdm/CreatePhrWithABHA/CreatePhr`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                phrAddress: values.abhaAddress,
                                transactionId: params.transactionId,
                                Auth_Token: Auth_Token,
                                password: values.password
                            }),
                        }
                    );
                    if (res.status === 200) {
                        const data = await res.json()
                        setSubmitting(true);
                        resetForm();
                        alert('Success')
                        router.push({
                            pathname: '/createABHA/',
                            
                          },
                        );

                    } else {
                        alert("Something went wrong. Please try again");
                    }
                } else{
                    alert('Address already exists. Please change it!')
                }
            } else {
                alert("Something went wrong")
            }

            
        },
        validationSchema: yup.object({
            abhaAddress: yup.string().required("This field is required"),
            password: yup.string().required("This field is required"),
        }),
    });

    return (
        <PageLayout
            title="Feeds | Healthy Habits,  Strong Community"
            login={false}
        >
            <section className="bg-white">
                <div className=" flex flex-wrap">
                    <div className="w-full grid grid-cols-2 overflow-hidden">
                        <div className="relative bg-[#20C4C8] text-center  overflow-hidden">
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
                        </div>
                        <div className=" bg-[#fff] rounded-e-xl grid place-content-center px-[120px]">
                            <h4 className="text-[28px] font-medium text-left text-black">
                                Set your new ABHA address
                            </h4>
                            <form onSubmit={formik.handleSubmit} className=" w-[600px]">
                                <div className="form__input__wrapper">
                                    
                                    <input
                                        id="abhaAddress"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.abhaAddress &&
                                            formik.errors.abhaAddress &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("abhaAddress")}
                                        placeholder="yourabha@sbx"
                                    />
                                    {formik.touched.abhaAddress && formik.errors.abhaAddress ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.abhaAddress}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form__input__wrapper">
                                    
                                    <input
                                        id="password"
                                        type="password"
                                        className={`form__input mt-4 ${
                                            formik.touched.password &&
                                            formik.errors.password &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("password")}
                                        placeholder="Your password"
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.password}
                                        </div>
                                    ) : null}

                                    <div className="text-sm mt-2 text-red-500">
                                        <p >Password must contain an uppercase, a lowercase, a number, a special character (@,_$,#) and at least 8 or more characters. It should not contain any sequences (like 123)</p>
                                    </div>
                                </div>

                                {suggestedAddress.length > 0 ? <div className="suggestions mt-6 \">
                                    <h4 className="font-bold text-blue-600">Suggestions:</h4>
                                    <div className="flex gap-x-4 flex-wrap">
                                        {suggestedAddress.map((phr) => {
                                            return <span key={phr}>{phr}</span>
                                        })}
                                       
                                    </div>
                                </div> : " "}

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
