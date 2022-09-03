import React from 'react';
import { Form, FormInstance, Input } from 'antd';

export interface TodosFormProps {
  form: FormInstance;
}

export default function TodosForm(props: TodosFormProps) {
  const { form } = props || {};

  return (
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Task Name"
      >
        <Input placeholder="Task Name" />
      </Form.Item>

      <Form.Item
        name="progress_percentage"
        label="Progress"
        wrapperCol={{ span: 10 }}
      >
        <Input placeholder="70%" />
      </Form.Item>
    </Form>
  )
}
