import { useState } from 'react';

const useValidation = (validation: () => boolean) => {
  const [inputValue, setInputValue] = useState('');
  const [interacted, setInteracted] = useState(false);

  const inputIsValid = validation;

  const hasError = interacted && !inputIsValid;

  const inputValueHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInteracted(false);
    setInputValue(e.currentTarget.value);
  };

  return {
    inputValue,
    inputValueHandler,
    hasError,
  };
};

export default useValidation;
