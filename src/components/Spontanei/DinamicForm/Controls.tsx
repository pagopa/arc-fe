import { Button, Stack } from "@mui/material"
import { useFormikContext } from "formik";
import React from "react"

const Controls = () => {
  const { submitForm, values, resetForm } = useFormikContext();
  
  const submit = () => {
    console.log(values);
    submitForm()
  }

  const reset = () => {
    resetForm()
  }
  
  return (
    <Stack
      direction="row"
      gap={2}
      justifyContent="end"
      mt={2}>
        <Button
          variant="outlined"
          size="large"
          onClick={reset}>
            Reset
        </Button>
        {/* <Button
          variant="contained"
          size="large"
          onClick={submit}
          type='submit'>
            Continua
        </Button> */}
    </Stack>
  ) 
}

export default Controls;
