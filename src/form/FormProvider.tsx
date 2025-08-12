import React, { ReactNode } from 'react';
import { FormProvider as RHFFormProvider, UseFormReturn } from 'react-hook-form';

interface FormProviderProps {
  children: ReactNode;
  methods: UseFormReturn<any>;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children, methods }) => {
  return (
    <RHFFormProvider {...methods}>
      {children}
    </RHFFormProvider>
  );
};