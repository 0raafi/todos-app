import React from 'react';
import clsx from 'clsx';
import { Button, Space } from 'antd';

import Tag from '../Tag';
import { PlusCircle } from '../Icons';

import './style.scss';

export interface GroupTaskProps {
  type: Type;
  title: string;
  children: any;
  onAddNew: () => void;
}

export default function GroupTask(props: GroupTaskProps) {
  const { title, type, children, onAddNew } = props || {};

  return (
    <div className={clsx(['group-task', type || 'primary'])}>
      <Tag type={type}>Group Task 1</Tag>
      <div className="text-s bold">{title}</div>
      {children}
      <div>
        <Button
          onClick={onAddNew}
          className="add-new"
        >
          <Space size={5} align="center">
            <PlusCircle />
            New Task
          </Space>
        </Button>
      </div>
    </div>
  )
}
