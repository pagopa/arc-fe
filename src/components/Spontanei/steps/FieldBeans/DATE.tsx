import { DatePicker } from '@mui/x-date-pickers';
import { FieldBeanPros, getErrorMessage, inputHasError } from '../config';
import dayjs from 'dayjs';




const DATE = (props: FieldBeanPros) => {
  const { input, formState, zodIssues, onChange } = props;
  const { name, htmlLabel, extraAttr } = input;
  const value = formState[name];
  const hasError = inputHasError(zodIssues, name);
  const dateFormat = extraAttr?.dateFormat;
  return (
    <DatePicker
      label={htmlLabel}
      format={dateFormat}
      slotProps={{
        textField: {
          error: hasError,
          helperText: getErrorMessage(zodIssues, name)
        }
      }}
      value={value ? dayjs(value) : undefined}
      onChange={(value) => {
        onChange(name, value?.format(dateFormat) || '');
      }}
    />
  )
}

export default DATE;
