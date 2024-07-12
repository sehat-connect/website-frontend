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
            abhaNumber: "",
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const res = await fetch(
                `${process.env.webUrl}/api/abdm/CreatePhrWithABHA/SearchHealthId`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        abhaNumber: values.abhaNumber,
                        Auth_Token: Auth_Token,
                    }),
                }
            );
            if (res.status === 200) {
                const data = await res.json();
                if (data.status == "ACTIVE") {
                    router.push({
                        pathname: "/createABHA/abha-address/create/abha-number/sendOtp",
                        query: {
                            status: data.status,
                            authMethods: data.authMethods,
                            abhaNumber: values.abhaNumber
                        },
                    });
                } else {
                    alert(
                        "Your ABHA number is not active. Please try other method to create ABHA address!"
                    );
                    router.push({
                        pathname: "/createABHA/",
                    });
                }
            } else {
                alert("ABHA Number does not exist!");
            }
        },
        validationSchema: yup.object({
            abhaNumber: yup
                .string()
                .min(14)
                .max(14)
                .required("This field is required"),
        }),
    });

    return (
        <PageLayout
            title="Feeds | Healthy Habits,  Strong Community"
            login={false}
        >
            <section className="bg-white">
                <div className=" flex flex-wrap">
                    <div className="w-full grid sm:grid-cols-2 grid-cols-1 overflow-hidden">
                        <div className="relative bg-[#20C4C8] text-center  overflow-hidden px-4 mb-6">
                            <p className="relative mb-4 sm:text-[34px] text-[24px] font-medium text-white sm:w-[60%] w-[100%] py-[40px] m-auto leading-[1.2]">
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
                        <div className=" bg-[#fff] rounded-e-xl grid place-content-center sm:px-[120px] px-4">
                            <h4 className="sm:text-[28px] text-[22px] font-medium text-left text-black">
                                Enter your 14 digit ABHA Number
                            </h4>
                            <form
                                onSubmit={formik.handleSubmit}
                                className=" sm:w-[600px] w-auto"
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
