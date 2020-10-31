import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'heroicons-react';
import { classNames } from '../../utils/classNames';

export interface Pocket {
  id: string;
  name: string;
  balance: number;
}

interface Props {
  selected: string;
  pockets: Pocket[];
  onChange: (pocketId: string) => void;
}

export default function Dropdown({ pockets, selected, onChange }: Props) {
  const activePocket = pockets.find((pocket) => pocket.id === selected);

  return (
    <span className="inline-block">
      <Listbox value={selected} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="flex flex-col relative w-full rounded-lg px-3 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150">
              <span className="relative flex font-medium text-xl leading-8">
                {activePocket.name}
                <span className="inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </span>
              <span className="text-gray-400 sm:text-xs sm:leading-4">
                Remaining: {activePocket.balance}
              </span>
            </Listbox.Button>
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
                {pockets.map((pocket) => (
                  <Listbox.Option key={pocket.id} value={pocket.id}>
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
                          <span>{pocket.name}</span>
                          <span
                            className={
                              active ? 'text-blue-200' : 'text-gray-500'
                            }
                          >
                            {pocket.balance}
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
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </span>
  );
}
