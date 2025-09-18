import FormControl from '@mui/material/FormControl';
import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { FieldBeanPros, inputHasError } from "../config";

const SELECT = (props: FieldBeanPros & { multiple?: boolean}) => {
  const { input, formState, zodIssues, onChange, multiple = false } = props;
  const { name, htmlLabel, required, extraAttr } = input;
  const value = multiple ? formState[name] || [] : formState[name];
  const hasError = inputHasError(zodIssues, name)

  return (
    <FormControl
      error={hasError}
      required={required}>
      {
        htmlLabel && <InputLabel>{htmlLabel}</InputLabel>
      }
      <Select
        multiple={multiple}
        name={name}
        onChange={(e) => onChange(name, e.target.value)}
        value={value}
        label={"test"} >
      {
        input.enumerationList?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))
      }
      </Select>
      {
        hasError && <FormHelperText>{ extraAttr?.error_message }</FormHelperText>
      }
    </FormControl>
  );
}

export default SELECT;
