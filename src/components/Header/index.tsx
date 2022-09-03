import React from 'react';
import { Button, ButtonProps, Space } from 'antd';

import useLocalData from '../../hooks/useLocalData';

import './style.scss';

export default function Header() {
  const { store } = useLocalData();
  const header: IHeaderAction<ButtonProps> = store?.header || {};

  return (
    <div className="layout-header">
      <Space size={10}>
        <h1 className="text-xl bold">{header?.title || ''}</h1>
        {
          header.actionProps && (
            <Button {...header.actionProps} />
          )
        }
      </Space>
    </div>
  )
}
