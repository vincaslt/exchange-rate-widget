import React, { useEffect, useRef, useState } from 'react';
import Transition from 'tailwindcss-transition';
import { ChevronDown } from 'heroicons-react';

interface Props {
  children?: React.ReactNode;
  autoClose?: boolean | 'outside';
}

export default function Dropdown({ children, autoClose = true }: Props) {
  const [isOpen, setOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      console.log({ isOpen, autoClose });
      const isClickOutsideDropdown =
        autoClose === 'outside' &&
        !nodeRef.current?.contains(e.target as HTMLElement);
      if (isClickOutsideDropdown || autoClose === true) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [autoClose, isOpen]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            Options
            <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
          </button>
        </span>
      </div>

      <Transition
        nodeRef={nodeRef}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          ref={nodeRef}
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg"
        >
          <div className="rounded-md bg-white shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {children}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
