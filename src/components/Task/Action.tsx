import React from 'react';

import { Dropdown } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

import SettingButton from '../SettingButton';
import DropdownOverlay from '../DropdownOverlay';
import { ArrowLeft, ArrowRight, Edit, Trash } from '../Icons';

export interface TaskActionProps {
  onItemClick: (key: any) => void;
}

export default function TaskAction(props: TaskActionProps) {
  const { onItemClick } = props || {};

  const items: ItemType[] = [
    {
      key: 'move-right',
      label: "Move Right",
      icon: <ArrowRight />,
      onClick: handleOnItemClick
    },
    {
      key: 'move-left',
      label: "Move Left",
      icon: <ArrowLeft />,
      onClick: handleOnItemClick
    },
    {
      key: 'update',
      label: "Edit",
      icon: <Edit />,
      onClick: handleOnItemClick
    },
    {
      key: 'delete',
      danger: true,
      label: "Delete",
      icon: <Trash />,
      onClick: handleOnItemClick
    },
  ];

  function handleOnItemClick(info: { key: string }) {
    onItemClick(info.key)
  }

  return (
    <Dropdown
      overlay={(
        <DropdownOverlay items={items} />
      )}
    >
      <SettingButton size="small" />
    </Dropdown>
  )
}
