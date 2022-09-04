import React from 'react';
import { Form, Modal } from 'antd';
import { useMutation } from '@apollo/client';

import TodosForm from './Form';

import { createTodosItem } from '../../../graphql/mutation/createTodosItem';

export interface TodosCreateProps {
  visible: boolean;
  onCancel: () => void;
  onCompleted: () => void;
  todo_id: string;
}

export default function TodosCreate(props: TodosCreateProps) {
  const [form] = Form.useForm();
  const { visible, onCancel, todo_id, onCompleted } = props || {};

  const [createItem] = useMutation(createTodosItem, {
    onCompleted
  });

  return (
    <Modal
      visible={visible}
      title="Create Task"
      okText="Save Task"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            createItem({
              variables: {
                ...values,
                todo_id
              }
            }).then(() => form.resetFields())
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <TodosForm form={form} />
    </Modal>
  )
}
