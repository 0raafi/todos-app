import { useEffect } from 'react';
import { ButtonProps, Col, Row } from 'antd';

import Task from '../../components/Task';
import GroupTask from '../../components/GroupTask';
import useLocalData from '../../hooks/useLocalData';

import './style.scss';

export default function Todos() {
  const { dispatch } = useLocalData();

  useEffect(() => {
    const value: IHeaderAction<ButtonProps> = {
      title: 'Product Roadmap',
      actionProps: {
        icon: (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2.5V9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.5 6H9.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        ),
        children: 'Add New Group',
        type: 'primary',
      }
    }

    dispatch({
      type: 'update',
      name: 'header',
      value
    })
  }, [])
  return (
    <Row gutter={16}>
      <Col lg={6}>
        <GroupTask
          type="primary"
          onAddNew={() => console.log('Add')}
          title="July - September"
        >
          <Task
            taskName="Re-designed the zero-g doggie bags. No more spills!"
            progressCount={80}
            onItemClick={(key) => console.log(key)}
          />
          <Task
            taskName="Re-designed the zero-g doggie bags. No more spills!"
            progressCount={80}
            onItemClick={(key) => console.log(key)}
          />
        </GroupTask>
      </Col>

    </Row>

  )
}
