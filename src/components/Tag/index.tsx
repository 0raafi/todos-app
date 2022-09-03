import React from 'react';
import clsx from 'clsx';

import './style.scss';

export interface TagProps {
  children: React.ReactNode;
  type?: Type;
}
export default function Tag(props: TagProps) {
  const { children, type } = props || {};

  return (
    <div className={clsx(['tag text-s', type || 'primary'])}>
      {children}
    </div>
  )
}
