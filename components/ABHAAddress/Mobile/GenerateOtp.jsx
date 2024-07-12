"use client"
import { useFormik } from "formik";
import * as yup from "yup";
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from "next/router";
export const GenerateOTP = ({ pack }) => {
    const router = useRouter()
    const Auth_Token = getCookie('Auth_Token')
    const formik = useFormik({
        initialValues: {
            mobileNumber: "",
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const res = await fetch(
                `${process.env.webUrl}/api/abdm/CreatePhrWithMobile/SendOtp`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        "mobileNumber": values.mobileNumber,
                        "Auth_Token": Auth_Token
                    }),
                }
            );
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                setSubmitting(true);
                resetForm();
                router.push({
                    pathname: '/abdm/abha-address/create/mobile/verify',
                    query: {
                        mobileNumber: values.mobileNumber,
                        transactionId: data.transactionId
                    },
                  },
                );
            } else {
                alert("Something went wrong. Please try again");
            }
        },
        validationSchema: yup.object({
            mobileNumber: yup.string().min(10).max(10).required("This field is required"),
        }),
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className=" sm:w-[600px] w-auto"> 
                <div className="form__input__wrapper">
                    {/* <label>Enter Your Mobile number</label> */}
                    <input
                        id="mobileNumber"
                        type="text"
                        className={`form__input mt-4 ${
                            formik.touched.mobileNumber &&
                            formik.errors.mobileNumber &&
                            "form__input--error"
                        }`}
                        {...formik.getFieldProps("mobileNumber")}
                        placeholder="10 Digit Mobile Number"
                    />
                    {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                        <div className="form__input__error-text">
                            {formik.errors.mobileNumber}
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
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        {!formik.isSubmitting ? <span>Next</span> : ""}
                        {formik.isSubmitting ? <span>Loading....</span> : ""}
                    </button>
                </div>
            </form>
        </>
    );
};
