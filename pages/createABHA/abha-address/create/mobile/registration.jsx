"use client";
import Image from "next/image";
import { React, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import * as yup from "yup";
import { getCookie, setCookie } from 'cookies-next';


export default function Index() {
    const router = useRouter()
    const params = router.query;
    const Auth_Token = getCookie('Auth_Token')

    const resendOtp  = async () => {
        const res = await fetch(
            `${process.env.webUrl}/api/abdm/CreatePhrWithMobile/ResendOtp`,
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
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            districtCode: "84" ,
            stateCode: "7",
            gender: "",
            dayOfBirth: "",
            monthOfBirth: "",
            yearOfBirth: "",
            pinCode: "",
            transactionId: params.transactionId,
            address: "",
            countryCode: "+91",
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const res = await fetch(
                `${process.env.webUrl}/api/abdm/CreatePhrWithMobile/RegistrationDetails`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        Auth_Token : Auth_Token,
                        ...values
                        
                    }),
                }
            );
            if (res.status === 200) {
                const data = await res.json()
                setSubmitting(true);
                resetForm();
                router.push({
                    pathname: '/createABHA/abha-address/create/mobile/register',
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
            firstName: yup.string().required("This field is required"),
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
                        <div className=" bg-[#fff] rounded-e-xl grid place-content-center px-[120px] ">
                            <h4 className="text-[28px] font-medium text-left text-black">
                                Registration Details
                            </h4>
                            <form onSubmit={formik.handleSubmit} className=" w-[600px]">
                                <div className="h-[370px] overflow-scroll">
                                <div className="form__input__wrapper">
                                    
                                    <input
                                        id="firstName"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.firstName &&
                                            formik.errors.firstName &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("firstName")}
                                        placeholder="First Name"
                                    />
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.firstName}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form__input__wrapper">
                                    
                                    <input
                                        id="lastName"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.lastName &&
                                            formik.errors.lastName &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("lastName")}
                                        placeholder="Last Name"
                                    />
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.lastName}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form__input__wrapper">
                                    <input
                                        id="mobile"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.mobile &&
                                            formik.errors.mobile &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("mobile")}
                                        placeholder="Mobile"
                                    />
                                    {formik.touched.mobile && formik.errors.mobile ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.mobile}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="form__input__wrapper">
                                    <input
                                        id="email"
                                        type="email"
                                        className={`form__input mt-4 ${
                                            formik.touched.email &&
                                            formik.errors.email &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("email")}
                                        placeholder="Email"
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form__input__wrapper">
                                    <input
                                        id="pinCode"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.pinCode &&
                                            formik.errors.pinCode &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("pinCode")}
                                        placeholder="Pincode"
                                    />
                                    {formik.touched.pinCode && formik.errors.pinCode ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.pinCode}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form__input__wrapper">
                                    <select
                                        id="gender"
                                        type="text"
                                        className={`form__input mt-4 ${
                                            formik.touched.gender &&
                                            formik.errors.gender &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("gender")}
                                        placeholder="gender"
                                    >
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="O">Other</option>
                                    </select>
                                    {formik.touched.gender && formik.errors.gender ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.gender}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="grid grid-cols-3 gap-5">
                                    <div>
                                        <div className="form__input__wrapper">
                                            <select
                                                id="dayOfBirth"
                                                type="text"
                                                className={`form__input mt-4 ${
                                                    formik.touched.dayOfBirth &&
                                                    formik.errors.dayOfBirth &&
                                                    "form__input--error"
                                                }`}
                                                {...formik.getFieldProps("dayOfBirth")}
                                                placeholder="Year Of Birth"
                                            >
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                            </select>
                                            {formik.touched.dayOfBirth && formik.errors.dayOfBirth ? (
                                                <div className="form__input__error-text">
                                                    {formik.errors.dayOfBirth}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form__input__wrapper">
                                            <select
                                                id="monthOfBirth"
                                                type="text"
                                                className={`form__input mt-4 ${
                                                    formik.touched.monthOfBirth &&
                                                    formik.errors.monthOfBirth &&
                                                    "form__input--error"
                                                }`}
                                                {...formik.getFieldProps("monthOfBirth")}
                                                placeholder="Year Of Birth"
                                            >
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            {formik.touched.monthOfBirth && formik.errors.monthOfBirth ? (
                                                <div className="form__input__error-text">
                                                    {formik.errors.monthOfBirth}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form__input__wrapper">
                                            <select
                                                id="yearOfBirth"
                                                type="text"
                                                className={`form__input mt-4 ${
                                                    formik.touched.yearOfBirth &&
                                                    formik.errors.yearOfBirth &&
                                                    "form__input--error"
                                                }`}
                                                {...formik.getFieldProps("yearOfBirth")}
                                                placeholder="Year Of Birth"
                                            >
                                                <option value="1993">1993</option>
                                                <option value="1994">1994</option>
                                                <option value="1995">1995</option>
                                                <option value="1996">1996</option>
                                                <option value="1997">1997</option>
                                            </select>
                                            {formik.touched.yearOfBirth && formik.errors.yearOfBirth ? (
                                                <div className="form__input__error-text">
                                                    {formik.errors.yearOfBirth}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="form__input__wrapper h-[100px]">
                                    <textarea
                                        id="address"
                                        
                                        className={`form__input mt-4 !h-[100px] ${
                                            formik.touched.address &&
                                            formik.errors.address &&
                                            "form__input--error"
                                        }`}
                                        {...formik.getFieldProps("address")}
                                        placeholder="Address"
                                    >
                                        </textarea>
                                    {formik.touched.address && formik.errors.address ? (
                                        <div className="form__input__error-text">
                                            {formik.errors.address}
                                        </div>
                                    ) : null}
                                </div>
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
