import { DatePicker } from '@mui/x-date-pickers';
import { FieldBeanPros } from '../config';
import dayjs from 'dayjs';
import { useField } from 'formik';
import React from 'react';
import { Stack, Tooltip } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const DATEPICKER = (props: FieldBeanPros) => {
  const { input } = props;
  const { name, htmlLabel, extraAttr } = input;
  const [field, meta, { setValue }] = useField(name);
  const value = field.value;
  const hasError = meta.touched && Boolean(meta.error);
  const dateFormat = extraAttr?.dateFormat;

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <DatePicker
        sx={{ width: '-webkit-fill-available' }}
        label={htmlLabel}
        format={dateFormat}
        slotProps={{
          textField: {
            required: input.required,
            error: hasError,
            helperText: hasError && extraAttr?.error_message
          }
        }}
        value={value ? dayjs(value) : undefined}
        onChange={(value) => {
          setValue(value?.format(dateFormat) || '');
        }}
      />
      <Tooltip title={input.extraAttr?.help_message}>
        <InfoRoundedIcon />
      </Tooltip>
    </Stack>
  );
};

export default DATEPICKER;
