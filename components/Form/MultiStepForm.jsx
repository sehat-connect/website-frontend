import React, { useState } from "react"
import { Formik } from "formik"
import FormNavigation from "./FormNavigation"
import { Step, StepLabel, Stepper } from "@mui/material"

const MultiStepForm = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0)
  const steps = React.Children.toArray(children)

  const [snapshot, setSnapshot] = useState(initialValues)

  const step = steps[stepNumber]
  const totalSteps = steps.length

  const isLastStep = stepNumber === totalSteps - 1

  const nextStep = values => {
    setSnapshot(values)
    console.log(snapshot)
    console.log(values)
    setStepNumber(stepNumber + 1)
  }

  const previousStep = values => {
    setSnapshot(values)
    setStepNumber(stepNumber - 1)
  }

  const handleSubmit = async (values, actions) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit
    }
    if (isLastStep) {
      return onSubmit(values, actions)
    } else {
      actions.setTouched({})
      nextStep(values)
    }
  }

  return (
    <div>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Stepper activeStep={stepNumber}>
              {steps.map(currentStep => {
                const label = currentStep.props.stepName
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>

            {step}

            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previousStep(formik.values)}
            />
          </form>
        )}
      </Formik>
    </div>
  )
}

export default MultiStepForm
export const FormStep = ({ stepName = "", children }) => children
