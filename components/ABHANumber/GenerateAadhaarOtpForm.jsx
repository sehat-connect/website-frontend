"use client";
import { useFormik } from "formik";
import * as yup from "yup";
// import "./index.css";
// import { Loader } from "@/app/_components/Loader";
export const GenerateAadhaarOTPForm = ({ pack }) => {
    const formik = useFormik({
        initialValues: {
            aadhaarNumber: "",
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_LIVE_URL}/api/contact-query`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            if (res.status === 201) {
                setSubmitting(true);
                resetForm();
            } else {
                alert("Something went wrong. Please try again");
            }
        },
        validationSchema: yup.object({
            aadhaarNumber: yup.string().min(12).max(12).required("This field is required"),
        }),
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className=" sm:w-[800px] w-auto">
                <div className="form__input__wrapper">
                    <label>Aadhaar number</label>
                    <input
                        id="aadhaarNumber"
                        type="text"
                        className={`form__input ${
                            formik.touched.aadhaarNumber &&
                            formik.errors.aadhaarNumber &&
                            "form__input--error"
                        }`}
                        {...formik.getFieldProps("aadhaarNumber")}
                        placeholder="12 Digit Aadhar Number"
                    />
                    {formik.touched.aadhaarNumber && formik.errors.aadhaarNumber ? (
                        <div className="form__input__error-text">
                            {formik.errors.aadhaarNumber}
                        </div>
                    ) : null}
                </div>
                <div className="my-8">
                    <div>
                        <p>Please ensure that mobile number is linked with Aadhaar as it will be required for OTP authentication.</p>
                        <p>If you do not have a mobile number linked, visit the nearest ABDM participating facility and seek assistance.</p>
                    </div>

                    <div className="w-full sm:h-[250px] h-auto overflow-scroll mt-8">
                        <h4 className="font-semibold">Terms and Conditions</h4>
                        <p>I hereby declare that I am voluntarily sharing my Aadhaar number and demographic information issued by UIDAI, with National Health Authority (NHA) for the sole purpose of creation of ABHA number. I understand that my ABHA number can be used and shared for purposes as may be notified by ABDM from time to time including provision of healthcare services. Further, I am aware that my personal identifiable information (Name, Address, Age, Date of Birth, Gender and Photograph) may be made available to the entities working in the National Digital Health Ecosystem (NDHE) which inter alia includes stakeholders and entities such as healthcare professionals (e.g. doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the Ayushman Bharat Digital Mission (ABDM), and various processes there under. I authorize NHA to use my Aadhaar number for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of “Yes” with NHA upon successful authentication. I have been duly informed about the option of using other IDs apart from Aadhaar; however, I consciously choose to use Aadhaar number for the purpose of availing benefits across the NDHE. I am aware that my personal identifiable information excluding Aadhaar number / VID number can be used and shared for purposes as mentioned above. I reserve the right to revoke the given consent at any point of time as per provisions of Aadhaar Act and Regulations.</p>
                    </div>
                </div>
                

                
                <div className="text-right form__input__wrapper">
                    <button
                        type="submit"
                        className={`uppercase py-2 px-10 text-base font-medium form__submit  ${
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
