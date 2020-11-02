import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Pockets } from '../../../interfaces/pockets';
import { Currency } from '../../../constants';
import PocketDropdownButton from './PocketDropdownButton';
import PocketDropdownOption from './PocketDropdownOption';

interface Props {
  selected: Currency;
  pockets: Pockets;
  onChange: (currency: Currency) => void;
  insufficient?: boolean;
}

export default function PocketDropdown({
  pockets,
  selected,
  onChange,
  insufficient,
}: Props) {
  const activePocket = pockets[selected];

  return (
    <span className="inline-block">
      <Listbox value={selected} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <PocketDropdownButton
              pocket={activePocket}
              insufficient={insufficient}
            />
            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute z-10 mt-1 min-w-full w-52 rounded-lg bg-white shadow-lg"
            >
              <Listbox.Options
                static
                className="max-h-60 rounded-lg py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
              >
                {Object.values(pockets).map((pocket) => (
                  <PocketDropdownOption key={pocket.currency} pocket={pocket} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </span>
  );
}
