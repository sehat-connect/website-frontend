"use client";
import Image from "next/image";
import { React, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginForm from "@/components/LoginForm";
import VerifyToken from "@/components/Helper/VerifyToken";
import GetCookie from "@/components/Helper/GetCookie";

import { GenerateOTP } from "@/components/ABHAAddress/Mobile/GenerateOtp";
export default function Index() {
    const router = useRouter();

    return (
        <PageLayout
            title="Feeds | Healthy Habits,  Strong Community"
            login={false}
        >
            <section className="bg-white">
                <div className=" flex flex-wrap">
                    <div className="w-full grid sm:grid-cols-2 grid-cols-1 overflow-hidden">
                        <div className="relative bg-[#20C4C8] text-center  overflow-hidden mb-4">
                            <p className="relative mb-4 sm:text-[34px] text-[24px] font-medium text-white sm:w-[60%] w-[100%] py-[40px] m-auto leading-[1.2]">
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
                        <div className=" bg-[#fff] rounded-e-xl grid place-content-center  sm:px-[120px] px-4">
                            <h4 className="text-[28px] font-medium text-left text-black mb-0">
                                Enter Your Mobile number
                            </h4>
                            <GenerateOTP />
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
