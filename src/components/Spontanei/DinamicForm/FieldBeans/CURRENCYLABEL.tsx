import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { FieldBeanPros, computeValue } from "../config";
import { useField, useFormikContext } from "formik";
import utils from "utils";

const CURRENCYLABEL = (props: FieldBeanPros) => {
  const { input } = props;
  const { name, valueDependsOn, htmlLabel } = input;
  const [field, , { setValue }] = useField(name);
  const { value } = field;

  const hasValuDependsOn = Boolean(valueDependsOn);

  const { values } = useFormikContext();

  useEffect(() => {
    if (hasValuDependsOn && valueDependsOn) {
      const newValue = computeValue(valueDependsOn, values);
      setValue(newValue, false);
    }
  },[values])

  return (
    <TextField
      label={htmlLabel}
      variant="outlined"
      disabled
      value={utils.converters.toEuro(value*100)}
      name={name} />
  );
}

export default CURRENCYLABEL;
