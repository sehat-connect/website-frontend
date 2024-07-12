import { useFormikContext } from "formik"

import data from "./../utils/data"

const { plans, addons } = data

export default function Recap({ handleChangePlan }) {
  const { values } = useFormikContext()
  const { plan, toggle, checked } = values
  const isYearly = toggle
  const planPrice = isYearly ? plans[plan].yearly : plans[plan].monthly

  const addonsPrice = checked.map(value => {
    {
      return isYearly ? addons[value].yearly : addons[value].monthly
    }
  })

  return (
    <>
      <div className="bg-alabaster flex flex-col px-4 py-5 rounded-lg">
        <div className="flex">
          <div className="flex flex-col items-start">
            <p className="capitalize text-marine-blue">
              {plan} {isYearly ? `(Yearly)` : `(Monthly)`}
            </p>
            <button
              className="underline text-cool-gray hover:text-purplish-blue"
              onClick={handleChangePlan}
            >
              Change
            </button>
          </div>
          <p className="text-marine-blue font-[500] ml-auto mt-4">
            {`$${planPrice}/${isYearly ? "yr" : "mo"}`}
          </p>
        </div>
        {checked.map(value => {
          return (
            <>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-cool-gray">{addons[value].label}</p>
                <p>
                  {isYearly
                    ? `+$${addons[value].yearly}/yr`
                    : `+$${addons[value].monthly}/mo`}
                </p>
              </div>
            </>
          )
        })}
      </div>
      <div className="flex px-4 py-7 justify-between">
        <p className="text-cool-gray">{`Total (per ${
          isYearly ? "year" : "month"
        })`}</p>
        <p className="text-purplish-blue font-[500] text-xl">{`+$${
          addonsPrice.length
            ? planPrice + addonsPrice.reduce((a, b) => a + b)
            : planPrice
        }/${isYearly ? "yr" : "mo"}`}</p>
      </div>
    </>
  )
}
