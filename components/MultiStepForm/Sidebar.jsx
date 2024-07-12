const steps = [
    {
      order: 1,
      title: "Consent Collection",
      name: "Aadhaar Number",
      description: "Please ensure that mobile number is linked with Aadhaar as it will be required for OTP authentication. "
    },
    {
      order: 2,
      title: "Aadhaar Authentication",
      name: "Aadhaar Authentication",
      description: "You have the option of monthly or yearly billing."
    },
    {
      order: 3,
      title: "Communication Details",
      name: "Pick add-ons",
      description: "Add-ons help enhance your gaming experience."
    },
    {
      order: 4,
      title: "ABHA Address Creation",
      name: "Finishing up",
      description: "Double-check everything looks OK before confirming."
    }
  ]
  
  export default function Sidebar(props) {
    return (
      <div className="flex-col gap-7 py-9 px-7 rounded-lg hidden lg:flex min-w-[370px] h-[570px] bg-gray-50">
        {steps.map(step => {
          return (
            <>
              <div className="flex flex-col text-left">
                <div className="flex gap-5 items-center">
                  <div
                    key={step.order}
                    className={`rounded-full w-8 h-8 border-2 text-center leading-7 ${
                      props.currentStep === step.order - 1
                        ? `text-marine-blue bg-[#20C4C8] border-[#20C4C8] text-white font-bold`
                        : `text-black border-[#20C4C8]`
                    }`}
                  >
                    {step.order}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-light-black">STEP {step.order}</p>
                    <p className="text-black capitalize font-bold">{step.title}</p>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    )
  }
  