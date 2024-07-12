import { useField, useFormikContext } from "formik"
import { useState } from "react"
import { Switch } from "@nextui-org/switch"
import { cn } from "@nextui-org/system"
import Image from "next/image"

const options = [
  {
    value: "arcade",
    label: "Arcade",
    icon: "/images/icon-arcade.svg",
    monthly: 9,
    yearly: 90
  },
  {
    value: "advanced",
    label: "Advanced",
    icon: "/images/icon-advanced.svg",
    monthly: 12,
    yearly: 120
  },
  {
    value: "pro",
    label: "Pro",
    icon: "/images/icon-pro.svg",
    monthly: 15,
    yearly: 150
  }
]

export default function PlanSelectionForm() {
  const { values, handleChange } = useFormikContext()

  const [toggle, setToggle] = useState(false)

  const RadioInput = ({ label, icon, price, isSelected, ...props }) => {
    const [field] = useField(props)
    return (
      <>
        <label
          className={`border-1 ${
            !isSelected
              ? `border-light-gray`
              : `border-purplish-blue bg-alabaster`
          } rounded-md p-4 flex items-center lg:items-start text-marine-blue font-[500] lg:flex-col w-full hover:border-purplish-blue`}
        >
          <Image
            src={icon}
            alt=""
            className="mr-4 lg:mb-12"
            width={40}
            height={40}
          />
          <div className="lg:flex lg:flex-col">
            <input type="radio" {...field} {...props} hidden className="" />
            <div className="flex flex-col">
              {label}
              <span className="text-light-gray">
                ${price}
                {!toggle ? `/mo` : `/yr`}
              </span>
              {toggle && <span className="font-normal">2 months free</span>}
            </div>
          </div>
        </label>
      </>
    )
  }

  return (
    <>
      <fieldset>
        <legend className="sr-only">Select a plan</legend>
        <div className="flex flex-col gap-3 lg:flex-row">
          {options.map(({ label, value, icon, monthly, yearly }) => {
            return (
              <RadioInput
                label={label}
                value={value}
                name="plan"
                id={value}
                key={value}
                icon={icon}
                price={!toggle ? monthly : yearly}
                isSelected={values.plan === value}
              />
            )
          })}
        </div>
      </fieldset>
      <div className="bg-magnolia rounded-md flex justify-center items-center py-3 mt-6">
        <label
          htmlFor="toggle"
          className={`${
            !toggle ? "text-marine-blue" : "text-light-gray"
          } font-semibold`}
        >
          Monthly
        </label>
        <Switch
          defaultSelected
          size="sm"
          isSelected={toggle}
          onValueChange={setToggle}
          onChange={handleChange}
          name="toggle"
          id="toggle"
          classNames={{
            base: cn(
              "w-full bg-transparent items-center",
              "justify-between cursor-pointer rounded-lg gap-2 p-2 border-transparent"
            ),
            wrapper:
              "p-0 h-5 w-10 bg-marine-blue group-data-[selected=true]:bg-marine-blue mr-0",
            thumb: cn(
              "w-4 h-4 shadow-lg ml-0.5", //selected
              // pressed
              // "group-data-[pressed=true]:w-5"
              "group-data-[selected=true]:ml-[22px]"
            )
          }}
        />
        <label
          htmlFor="toggle"
          className={`${
            toggle ? "text-marine-blue" : "text-light-gray"
          } font-semibold`}
        >
          Yearly
        </label>
      </div>
    </>
  )
}
