import React from "react";
import { TextField } from "@mui/material";
import { FieldBeanPros, buildDinamicValue } from "../config";
import { useField, useFormikContext } from 'formik';
import { FieldBean } from "../mockServiziDinamici";

const NONE = (props: FieldBeanPros & { allFields: FieldBean[] }) => {
  const { input, allFields = [] } = props;
  const { name, htmlLabel } = input;
  const [field] = useField(name);
  const { values } = useFormikContext();

  const hasJoinTemplate = input.extraAttr?.join_template;

  const value = hasJoinTemplate ?
    buildDinamicValue(hasJoinTemplate, values, allFields) :
    field.value

  return (
    <TextField
      label={htmlLabel}
      variant="outlined"
      disabled
      value={value}
      name={name} />
  );
}

export default NONE;
