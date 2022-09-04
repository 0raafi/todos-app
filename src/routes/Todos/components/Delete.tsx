import React from 'react';
import { Modal, Space } from 'antd';
import { useMutation } from '@apollo/client';

import { Exclamation } from '../../../components/Icons';

import { deleteTodosItem } from '../../../graphql/mutation/deleteTodosItem';

export interface TodosDeleteProps {
  todo_id: string;
  id: string;
  visible: boolean;
  onCancel: () => void;
  onCompleted: () => void;
}

export default function TodosDelete(props: TodosDeleteProps) {
  const { visible, todo_id, id, onCancel, onCompleted } = props || {};

  const [deleteItem] = useMutation(deleteTodosItem, {
    variables: {
      todo_id,
      id
    },
    onCompleted
  })

  return (
    <Modal
      visible={visible}
      onOk={() => deleteItem()}
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
