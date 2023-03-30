import { useState } from 'react';

const useValidation = (validation: (validationFn: string) => boolean) => {
  const [inputValue, setInputValue] = useState('');
  const [interacted, setInteracted] = useState(false);

  const isValid = validation(inputValue);

  const hasError = interacted && !isValid;

  const inputValueHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInteracted(false);
    setInputValue(e.currentTarget.value);
  };

  const inputBlurHandler = () => {
    setInteracted(true);
  };

  const resetInput = () => {
    setInteracted(false);
    setInputValue('');
  };

  return {
    inputValue,
    inputValueHandler,
    inputBlurHandler,
    hasError,
    isValid,
    resetInput,
  };
};

export default useValidation;

export const emptyFieldValidation = (input: string) => {
  return input.trim().length > 0;
};

export const emailValidation = (input: string) => {
  return (
    input.trim().includes('@') &&
    input.trim().includes('.') &&
    input.trim().length > 4
  );
};

export const passwordValidation = (input: string) => {
  return input.trim().length >= 6;
};
