import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import { useMutation } from '@apollo/client';

import TodosForm from './Form';

import { updateTodosItem } from '../../../graphql/mutation/updateTodosItem';

export interface TodosUpdateProps {
  formValue: {
    name: string;
    progress_percentage: number;
  }
  id: string;
  todo_id: string;
  visible: boolean;
  onCancel: () => void;
  onCompleted: () => void;
}

export default function TodosUpdate(props: TodosUpdateProps) {
  const [form] = Form.useForm();
  const { visible, formValue, todo_id, id, onCancel, onCompleted } = props || {};

  const [updateItem] = useMutation(updateTodosItem, {
    onCompleted
  })

  useEffect(() => {
    form.setFieldsValue(formValue);

  }, [formValue])
  

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
            updateItem({
              variables: {
                ...values,
                id,
                todo_id,
                target_todo_id: todo_id
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
