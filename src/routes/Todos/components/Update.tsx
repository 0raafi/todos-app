import React from 'react';
import { Form, Modal } from 'antd';

import TodosForm from './Form';

export interface TodosUpdateProps {
  visible: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

export default function TodosUpdate(props: TodosUpdateProps) {
  const [form] = Form.useForm();
  const { visible, onCancel, onComplete } = props || {};

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
            form.resetFields();
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
