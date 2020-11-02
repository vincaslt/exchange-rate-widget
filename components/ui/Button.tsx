import React from 'react';
import { classNames } from '../../utils/classNames';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disabled?: boolean;
}

function Button({ disabled, onClick, tabIndex, ...rest }: Props) {
  return (
    <button
      type="submit"
      tabIndex={disabled ? -1 : tabIndex}
      disabled={disabled}
      onClick={disabled ? onClick : undefined}
      className={classNames(
        'm-3 bg-blue rounded-lg px-4 py-2 font-medium leading-6 focus:outline-none text-center transition duration-150',
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-default'
          : 'bg-blue-600 text-white hover:bg-blue-500 shadow focus:shadow-outline-blue cursor-pointer'
      )}
      {...rest}
    >
      Exchange
    </button>
  );
}

export default Button;
