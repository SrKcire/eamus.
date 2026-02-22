import { useState } from 'react';

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name: string, value: any) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialValues);

  return [values, handleChange, reset];
};
