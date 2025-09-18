import { TextField } from "@mui/material";
import { FieldBeanPros } from "../config";


const CURRENCYLABEL = (props: FieldBeanPros) => {
  const { input, formState } = props;
  const { name, htmlLabel } = input;
  const value = formState[name];
  return (
    <TextField
      label={htmlLabel}
      variant="outlined"
      disabled
      value={value}
      name={name} />
  );
}

export default CURRENCYLABEL;
