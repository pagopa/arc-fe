import React from 'react';
import { Stack, TextField, Tooltip } from '@mui/material';
import { FieldBeanPros } from '../config';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useField } from 'formik';

const TEXT = (props: FieldBeanPros) => {
  const { input } = props;
  const { name, htmlLabel, required } = input;
  const [field, meta] = useField(name);

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <TextField
        label={htmlLabel}
        variant="outlined"
        required={required}
        value={field.value}
        name={name}
        error={meta.touched && Boolean(meta.error)}
        onChange={field.onChange}
        onBlur={field.onBlur}
        helperText={meta.touched && meta.error}
        sx={{ flexGrow: 1 }}
      />
      <Tooltip title={input.extraAttr?.help_message}>
        <InfoRoundedIcon />
      </Tooltip>
    </Stack>
  );
};

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
