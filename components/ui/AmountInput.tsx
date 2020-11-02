import React from 'react';
import NumberInput from 'react-number-format';

interface Props {
  value?: number | null;
  onChange: (value?: number) => void;
  prefix: '-' | '+';
}

function AmountInput({ onChange, value = null, prefix }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/\+|-/, ''));
    onChange(value);
  };

  return (
    <NumberInput
      className="flex w-full text-right text-xl h-20 bg-transparent outline-none placeholder-gray-400"
      placeholder="0"
      decimalScale={2}
      allowNegative={false}
      prefix={prefix}
      onChange={handleChange}
      value={value as any}
    />
  );
}

export default AmountInput;
