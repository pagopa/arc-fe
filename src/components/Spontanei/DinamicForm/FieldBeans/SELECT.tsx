import React from 'react';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FieldBeanPros } from '../config';
import { useField } from 'formik';

const SELECT = (props: FieldBeanPros & { multiple?: boolean }) => {
  const { input, multiple = false } = props;
  const { name, htmlLabel, required, extraAttr } = input;
  const [field, meta] = useField(name);
  const value = field.value;
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={hasError} required={required}>
      {htmlLabel && <InputLabel>{htmlLabel}</InputLabel>}
      <Select
        multiple={multiple}
        name={name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        label={htmlLabel}
        value={value}>
        {input.enumerationList?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{extraAttr?.error_message}</FormHelperText>}
    </FormControl>
  );
};

export default SELECT;
