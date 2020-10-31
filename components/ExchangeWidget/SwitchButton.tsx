import { Refresh } from 'heroicons-react';
import React from 'react';

export default function SwitchButton() {
  return (
    <button
      type="button"
      className="w-7 h-7 flex rounded-full border-2 border-gray-50 bg-white text-blue-600 focus:outline-none focus:shadow-outline-blue"
    >
      <Refresh className="w-4 h-4 m-auto" />
    </button>
  );
}
