import { Stack, TextField, Tooltip } from "@mui/material";
import { FieldBeanPros, getErrorMessage, inputHasError } from "../config";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const TEXT = (props: FieldBeanPros) => {
  const { input, formState, zodIssues, onChange } = props;
  const { name, htmlLabel, required } = input;
  const value = formState[name];
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <TextField
        label={htmlLabel}
        variant="outlined"
        required={required}
        value={value}
        name={name}
        error={inputHasError(zodIssues, name)}
        onChange={(e) => onChange(name, e.currentTarget.value)}
        helperText={getErrorMessage(zodIssues, name)} 
        sx={{ flexGrow: 1 }}/>
      <Tooltip title={input.extraAttr?.help_message}>
        <InfoRoundedIcon/>
      </Tooltip>
    </Stack>
  );
}

export default TEXT;
// {
//       const hasJoinTemplate = input.extraAttr?.join_template;
//       let value: string = '';
//       if (hasJoinTemplate) {
//         value = buildDinamicValue(hasJoinTemplate, formState);
//       } else {
//         value = formState[fieldName];
//       }

//     }
