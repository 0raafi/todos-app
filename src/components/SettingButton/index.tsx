import React from 'react'
import clsx from 'clsx';
import { Button, ButtonProps } from 'antd';

import { Setting } from '../Icons'

import './style.scss';

export default function SettingButton(props: ButtonProps) {
  const { className, ...restProps } = props || {};

  return (
    <Button
      className={clsx(['setting-btn', className])}
      {...restProps}
    >
      <Setting />
    </Button>
  )
}
