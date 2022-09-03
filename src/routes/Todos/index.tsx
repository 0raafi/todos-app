import { useEffect } from 'react';
import { ButtonProps, Col, Row } from 'antd';

import Task from '../../components/Task';
import { Plus } from '../../components/Icons';
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
          <Plus />
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
