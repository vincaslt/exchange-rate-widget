import { Listbox } from '@headlessui/react';
import { Check } from 'heroicons-react';
import React from 'react';
import { Pocket } from '../../../interfaces/pockets';
import { classNames } from '../../../utils/classNames';
import { formatCurrency } from '../../../utils/currency';

interface Props {
  pocket: Pocket;
}

export default function PocketDropdownOption({ pocket }: Props) {
  return (
    <Listbox.Option value={pocket.currency}>
      {({ active, selected }) => (
        <div
          className={classNames(
            'cursor-default select-none relative py-2 pl-8 pr-4 w-full',
            active ? 'text-white bg-blue-600' : 'text-gray-900'
          )}
        >
          <div
            className={classNames(
              'flex justify-between',
              selected ? 'font-medium' : 'font-normal'
            )}
          >
            <span>{pocket.currency}</span>
            <span className={active ? 'text-blue-200' : 'text-gray-500'}>
              {formatCurrency(pocket.balance, pocket.currency, true)}
            </span>
          </div>
          {selected && (
            <span
              className={classNames(
                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                active ? 'text-white' : 'text-blue-600'
              )}
            >
              <Check className="h-5 w-5" />
            </span>
          )}
        </div>
      )}
    </Listbox.Option>
  );
}
