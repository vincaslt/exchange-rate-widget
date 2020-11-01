import { Refresh } from 'heroicons-react';
import React from 'react';

interface Props {
  onClick: () => void;
}

export default function SwitchButton({ onClick }: Props) {
  return (
    <button
      type="button"
      className="w-7 h-7 flex rounded-full border-2 border-gray-50 bg-white text-blue-600 focus:outline-none focus:shadow-outline-blue"
      onClick={onClick}
    >
      <Refresh className="w-4 h-4 m-auto" />
    </button>
  );
}
