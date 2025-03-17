import React from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Steps = (props: { activeStep: number }) => {
  const { t } = useTranslation();
  const steps = [
    t('spontanei.form.steps.step1.step'),
    t('spontanei.form.steps.step2.step'),
    t('spontanei.form.steps.step3.step'),
    t('spontanei.form.steps.step4.step')
  ];
  return (
    <Stepper activeStep={props.activeStep} alternativeLabel>
      {steps.map((label) => {
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default Steps;
