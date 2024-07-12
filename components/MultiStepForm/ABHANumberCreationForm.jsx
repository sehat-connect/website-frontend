import { useRef, useState } from "react"
import TopBar from "./TopBar"
import Card from "./Card"
import Recap from "./Recap"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import PersonalForm from "./Forms/PersonalForm"
import BottomBar from "./BottomBar"
import PlanSelectionForm from "./Forms/PlanSelectionForm"
import AddonsForm from "./Forms/AddonsForm"

const phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const steps = [
  {
    order: 1,
    name: "Aadhaar Number",
    description: "Please ensure that mobile number is linked with Aadhaar as it will be required for OTP authentication. If you do not have a mobile number linked, visit the nearest ABDM participating facility and seek assistance."
  },
  {
    order: 2,
    name: "Select your plan",
    description: "You have the option of monthly or yearly billing."
  },
  {
    order: 3,
    name: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience."
  },
  {
    order: 4,
    name: "Finishing up",
    description: "Double-check everything looks OK before confirming."
  },
  {
    order: 5,
    name: "Thank you!",
    description:
      "Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
  }
]

export default function ABHANumberCreationForm() {
  const formRef = useRef(null)

  // renders the form content for each step
  function renderForm(step) {
    switch (step) {
      case 0:
        return <PersonalForm />
      case 1:
        return <PlanSelectionForm />
      case 2:
        return <AddonsForm />
      case 3:
        return <Recap handleChangePlan={handleChangePlan} />
      default:
        break
    }
  }

  // function for the go back button
  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    console.log("back")
  }

  // functon for the change plan button
  const handleChangePlan = () => {
    setCurrentStep(1)
  }

  // state to track the current step
  const [currentStep, setCurrentStep] = useState(0)

  // checks if it's the final step
  const isFinalStep = currentStep === steps.length - 2

  // checks if it's the order success page
  const orderSuccess = currentStep === steps.length - 1

  // function for the form submission
  const hansdleSubmit = () => {
    if (formRef.current) {
      if (isFinalStep) {
        setCurrentStep(currentStep + 1)
      } else if (Object.keys(formRef.current.touched).length === 0) {
        console.log("empty")
        formRef.current.handleSubmit()
        return
      } else if (formRef.current.isValid) {
        setCurrentStep(currentStep + 1)
        console.log(currentStep)
      }
    }
  }

  return (
    <>
      <TopBar currentStep={currentStep} />
      <>
        <Card
          currentStep={currentStep}
          title={steps[currentStep].name}
          description={steps[currentStep].description}
          orderSuccess={orderSuccess}
        >
          <Formik
            innerRef={formRef}
            initialValues={{
              name: "",
              email: "",
              phone: "",
              plan: "arcade",
              toggle: false,
              checked: []
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("This field is required"),
              email: Yup.string()
                .required("This field is required")
                .email("Invalid email addresss"),
              phone: Yup.string()
                .required("This field is required")
                .matches(phoneRegEx, "Phone number is not valid"),
              plan: Yup.string(),
              toggle: Yup.boolean(),
              checked: Yup.array()
            })}
            onSubmit={hansdleSubmit}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form className={`flex flex-col ${!orderSuccess && `h-full`}`}>
                {renderForm(currentStep)}
                {!orderSuccess && (
                  <div className="w-full lg:flex items-center justify-between mt-auto bg-white py-4 hidden">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="bg-black inline-block text-white rounded-md p-3 ml-0 hover:opacity-80 ${isFinalStep &&
                          `hover:bg-purplish-blue"
                      >
                        Go back
                      </button>
                    )}

                    <button
                      type="submit"
                      className={`bg-[#20C4C8] inline-block text-white rounded-md p-3 ml-auto hover:opacity-80 ${isFinalStep &&
                        `hover:bg-purplish-blue`}`}
                    >
                      {isFinalStep ? "Confirm" : `Next Step`}
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Card>
        <BottomBar
          handleSubmit={hansdleSubmit}
          handleBack={handleBack}
          currentStep={currentStep}
          isFinalStep={isFinalStep}
          orderSuccess={orderSuccess}
        ></BottomBar>
      </>
    </>
  )
}
