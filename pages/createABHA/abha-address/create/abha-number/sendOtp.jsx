"use client";
import Image from "next/image";
import { React, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as yup from "yup";
import { getCookie, setCookie } from "cookies-next";

import { GenerateOTP } from "@/components/ABHAAddress/Mobile/GenerateOtp";
export default function Index() {
    const router = useRouter();
    const params = router.query;
    const Auth_Token = getCookie("Auth_Token");

    const formik = useFormik({
        initialValues: {
            abhaNumber: params.abhaNumber,
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const res = await fetch(
                `${process.env.webUrl}/api/abdm/CreatePhrWithABHA/SendOtp`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        abhaNumber: values.abhaNumber,
                        authMethod: values.authMethod,
                        Auth_Token: Auth_Token,
                    }),
                }
            );
            if (res.status === 200) {
                const data = await res.json();
                
                    router.push({
                        pathname: "/createABHA/abha-address/create/abha-number/verify",
                        query: {
                            transactionId: data.transactionId,
                        },
                    });
            } else {
                alert("Something went wrong!");
            }
        },
        validationSchema: yup.object({
            authMethod: yup
                .string()
                .required("This field is required"),
            abhaNumber: yup
                .string()
                .min(14)
                .max(14)
                .required("This field is required"),
        }),
    });
    console.log(params.authMethods)
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
                                Create ABHA Address Using ABHA Number
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
                                Select auth method to receive OTP
                            </h4>
                            <form
                                onSubmit={formik.handleSubmit}
                                className=" w-[600px]"
                            >
                                <div className="form__input__wrapper">
                                    <input
                                        id="abhaNumber"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.abhaNumber &&
                                            formik.errors.abhaNumber &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("abhaNumber")}
                                        placeholder="14 digit ABHA number"
                                    />
                                    {formik.touched.abhaNumber &&
                                    formik.errors.abhaNumber ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.abhaNumber}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form__input__wrapper">
                                    <select
                                        id="authMethod"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.authMethod &&
                                            formik.errors.authMethod &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("authMethod")}
                                        placeholder="14 digit ABHA number"
                                    >
                                        {params.authMethods && params.authMethods.map((method) => {
                                            return method == 'AADHAAR_OTP' || method == 'MOBILE_OTP' ? <option value={method}>{method}</option> : ""
                                        })}
                                        

                                        </select>
                                    {formik.touched.authMethod &&
                                    formik.errors.authMethod ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.authMethod}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="text-right form__input__wrapper mt-8">
                                    <button
                                        type="submit"
                                        className={`uppercase py-2 px-10 rounded-lg text-base font-medium form__submit  ${
                                            formik.isValid && formik.dirty
                                                ? ""
                                                : "form__submit__disabled"
                                        }`}
                                        disabled={
                                            !(formik.isValid && formik.dirty)
                                        }
                                    >
                                        {!formik.isSubmitting ? (
                                            <span>Next</span>
                                        ) : (
                                            ""
                                        )}
                                        {formik.isSubmitting ? (
                                            <span>Loading....</span>
                                        ) : (
                                            ""
                                        )}
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
