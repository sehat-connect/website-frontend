import React from "react"
import { useField } from "formik"
import { TextField } from "@mui/material"

const InputField = ({ name, label, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <TextField
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  )
}

export default InputField
