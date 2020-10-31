import { TrendingUp } from 'heroicons-react';
import React from 'react';

export default function ExchangeRate() {
  return (
    <span className="absolute text-sm leading-4 flex items-center left-1/2 transform -translate-x-1/2 rounded-full px-3 border-2 border-gray-50 p-1 bg-white text-blue-600">
      <TrendingUp className="w-4 h-4 mr-2" />
      1$ = 0.8511E
    </span>
  );
}
