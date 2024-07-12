export default function SubmitButton(props) {
  const {
    currentStep,
    handleBack,
    isFinalStep,
    handleSubmit,
    orderSuccess
  } = props
  return (
    <>
      {!orderSuccess && (
        <div className="w-full flex items-center justify-between mt-auto bg-white px-[4%] py-4 lg:hidden">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="text-cool-gray font-[500] hover:text-marine-blue"
            >
              Go back
            </button>
          )}

          <button
            type="submit"
            className="bg-[#20C4C8] inline-block text-white rounded-md p-3 ml-auto hover:opacity-80"
            onClick={handleSubmit}
          >
            {isFinalStep ? "Confirm" : `Next Step`}
          </button>
        </div>
      )}
    </>
  )
}
