import React from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab } from '@mui/material';
import { BuildFormInputs, FieldBeanPros, computeValue } from '../config';
import { useField, useFormikContext } from 'formik';

const TAB = (props: FieldBeanPros) => {
  const { input } = props;
  const { name } = input;
  const [field, , { setValue }] = useField(name);
  const defaultValue = input.defaultValue || (input.subfields && input.subfields[0].name);
  const value = field.value || defaultValue;
  const { values } = useFormikContext();

  return (
    <TabContext value={value}>
      <TabList variant="fullWidth" onChange={(_, value) => setValue(value)}>
        {input.subfields?.map((field) => {
          const { enabledDependsOn } = field;
          const hasEnabledDependsOn = Boolean(enabledDependsOn);

          const enabled =
            hasEnabledDependsOn && enabledDependsOn
              ? computeValue(enabledDependsOn, values)
              : false;
          return <Tab label={field.htmlLabel} value={field.name} disabled={!enabled} />;
        })}
      </TabList>
      {input.subfields?.map((field) => {
        const { enabledDependsOn } = field;
        const hasEnabledDependsOn = Boolean(enabledDependsOn);

        const enabled =
          hasEnabledDependsOn && enabledDependsOn ? computeValue(enabledDependsOn, values) : false;
        return (
          <TabPanel value={field.name} key={field.name} sx={{ padding: 0 }}>
            <fieldset disabled={!enabled} style={{ padding: '16px' }}>
              <Stack gap={2} direction="row">
                {BuildFormInputs(field.subfields || [])}
              </Stack>
            </fieldset>
          </TabPanel>
        );
      })}
    </TabContext>
  );
};

export default TAB;
