import { useState } from 'react';

const useValidation = (validation: (a: string) => boolean) => {
  const [inputValue, setInputValue] = useState('');
  const [interacted, setInteracted] = useState(false);

  const inputIsValid = validation(inputValue);

  const hasError = interacted && !inputIsValid;

  const inputValueHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInteracted(false);
    setInputValue(e.currentTarget.value);
  };

  const inputBlurHandler = () => {
    setInteracted(true);
  };

  return {
    inputValue,
    inputValueHandler,
    inputBlurHandler,
    hasError,
  };
};

export default useValidation;
