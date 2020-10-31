import React from 'react';
import { classNames } from '../../utils/classNames';
import Dropdown from '../ui/Dropdown/Dropdown';

interface Props {
  className?: string;
}

export default function ExchangeWidget({ className }: Props) {
  return (
    <div className={classNames('bg-white', className)}>
      <Dropdown />
    </div>
  );
}
