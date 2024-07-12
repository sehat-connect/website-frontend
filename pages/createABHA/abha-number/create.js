"use client";
import Image from "next/image";
import { React, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginForm from "@/components/LoginForm";
import VerifyToken from "@/components/Helper/VerifyToken";
import GetCookie from "@/components/Helper/GetCookie";

import ABHANumberCreationForm from "@/components/MultiStepForm/ABHANumberCreationForm";
import { GenerateAadhaarOTPForm } from "@/components/ABHANumber/GenerateAadhaarOtpForm";
export default function CreateABHANumber() {
    const router = useRouter();

    return (
        <PageLayout
            title="Feeds | Healthy Habits,  Strong Community"
            login={false}
        >
            <section className="bg-white py-16">
                <div className=" flex flex-wrap">
                    <div className="w-full grid grid-cols-1 overflow-hidden px-4">
                        {/* <div className="relative bg-[#20C4C8] text-center  overflow-hidden">
                            <p className="relative mb-4 text-[34px] font-medium text-white w-[60%] py-[40px] m-auto leading-[1.2]">
                                Create ABHA Number Using Aadhaar
                            </p>
                            <Image
                                src="/images/create.png"
                                width={550}
                                height={450}
                                className="relative object-contain m-auto "
                                alt=""
                            />
                        </div> */}
                        <div className=" bg-[#fff]  rounded-e-xl grid place-content-center sm:px-[120px] px-4">
                            <h4 className="sm:text-[34px] text-[26px] font-medium text-center text-black">
                                Create ABHA Number
                            </h4>

                            {/* <ABHANumberCreationForm /> */}
                            <GenerateAadhaarOTPForm />
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
