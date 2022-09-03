import { useEffect, useState } from 'react';
import { ButtonProps, Col, Row } from 'antd';

import Task from '../../components/Task';
import TodosCreate from './components/Create';
import TodosDelete from './components/Delete';
import { Plus } from '../../components/Icons';
import GroupTask from '../../components/GroupTask';

import useLocalData from '../../hooks/useLocalData';

import './style.scss';

export default function Todos() {
  const { dispatch } = useLocalData();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState<'create' | 'update' | 'delete' | null>(null);

  function handleOnItemClick(type: 'update' | 'delete' | 'move-left' | 'move-right', value?: string) {    
    switch (type) {
      case 'delete':
        setShowModal(type)
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    console.log(showModal);
    
  }, [showModal])
  
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
    <>
      <Row gutter={16}>
        <Col lg={6}>
          <GroupTask
            type="primary"
            onAddNew={() => setShowModal('create')}
            title="July - September"
          >
            <Task
              taskName="Re-designed the zero-g doggie bags. No more spills!"
              progressCount={80}
              onItemClick={(key) => handleOnItemClick(key)}
            />
            <Task
              taskName="Re-designed the zero-g doggie bags. No more spills!"
              progressCount={80}
              onItemClick={(key) => handleOnItemClick(key)}
            />
          </GroupTask>
        </Col>
      </Row>

      <TodosCreate
        visible={showModal === 'create'}
        onCancel={() => setShowModal(null)}
        onComplete={() => console.log('')}
      />

      <TodosDelete
        visible={showModal === 'delete'}
        onCancel={() => setShowModal(null)}
        onComplete={() => console.log('')}
      />
    </>
  )
}
