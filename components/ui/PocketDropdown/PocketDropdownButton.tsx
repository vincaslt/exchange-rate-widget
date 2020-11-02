import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'heroicons-react';
import React from 'react';
import { Pocket } from '../../../interfaces/pockets';
import { classNames } from '../../../utils/classNames';
import { formatCurrency } from '../../../utils/currency';

interface Props {
  pocket: Pocket;
  insufficient?: boolean;
}

export default function PocketDropdownButton({ pocket, insufficient }: Props) {
  return (
    <Listbox.Button
      data-test-id="button-pocket-dropdown"
      className="flex flex-col relative w-full rounded-lg px-3 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150"
    >
      <span className="relative flex font-medium text-xl leading-8">
        {pocket.currency}
        <span className="inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown className="h-4 w-4" />
        </span>
      </span>
      <span
        className={classNames(
          'sm:text-xs sm:leading-4 transition duration-150',
          insufficient ? 'text-red-500' : 'text-gray-400'
        )}
      >
        Remaining:{' '}
        <span data-test-id="pocket-balance">
          {formatCurrency(pocket.balance, pocket.currency, true)}
        </span>
      </span>
    </Listbox.Button>
  );
}
