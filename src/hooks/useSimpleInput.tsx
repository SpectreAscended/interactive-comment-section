import { useState } from 'react';

const useSimpleInput = () => {
  const [inputValue, setInputValue] = useState('');

  const setInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const resetInput = () => {
    setInputValue('');
  };

  return {
    inputValue,
    setInput,
    resetInput,
  };
};

export default useSimpleInput;
