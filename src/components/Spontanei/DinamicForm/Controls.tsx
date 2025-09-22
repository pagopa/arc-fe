import { Button, Stack } from "@mui/material"
import React from "react"

type ControlsProps = {
  reset?: () => void
  submit?: (values) => void
}

const Controls = (props: ControlsProps) => {
  return (
    <Stack
      direction="row"
      gap={2}
      justifyContent="end"
      mt={2}>
        <Button
          variant="outlined"
          size="large"
          onClick={props.reset}>
            Reset
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={props.submit}
          type='submit'>
            Continua
        </Button>
    </Stack>
  ) 
}

export default Controls;
