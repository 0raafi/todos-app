import React from 'react';
import { Modal, Space } from 'antd';

import { Exclamation } from '../../../components/Icons';

export interface TodosDeleteProps {
  visible: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

export default function TodosDelete(props: TodosDeleteProps) {
  const { visible, onCancel, onComplete } = props || {};
  
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={(
        <Space size={8}>
          <Exclamation />
          Delete Task
        </Space>
      )}
      okText="Delete"
      okButtonProps={{
        danger: true
      }}
    >
      <p className="text-m">Are you sure want to delete this task? your action can’t be reverted.</p>
    </Modal>
  )
}
