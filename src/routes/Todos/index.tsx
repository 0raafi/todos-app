import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { ButtonProps, Col, Row } from 'antd';

import Task from '../../components/Task';
import TodosCreate from './components/Create';
import TodosDelete from './components/Delete';
import { Plus } from '../../components/Icons';
import GroupTask from '../../components/GroupTask';

import useLocalData from '../../hooks/useLocalData';

import { todosQuery } from '../../graphql/queries/todos';

import './style.scss';

export default function Todos() {
  const { dispatch } = useLocalData();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState<'create' | 'update' | 'delete' | null>(null);
  const [todos, setTodos] = useState([]);
  const groupTaskType = {
    '0': 'primary',
    '1': 'secondary',
    '2': 'danger',
    '3': 'success'
  }

  useQuery(todosQuery, {
    onCompleted: ({ todos }) => {
      setTodos(todos);

    }
  })

  function handleOnItemClick(type: 'update' | 'delete' | 'move-left' | 'move-right', value?: string) {
    switch (type) {
      case 'delete':
      case 'update':
        setShowModal(type)
        break;

      default:
        break;
    }
  }

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
        {
          todos.map(({ title, id, description }, key) => (
            <Col lg={6} key={id}>
              <GroupTask
                type={groupTaskType[`${key}` as '0' | '1' | '2' | '3'] as any}
                onAddNew={() => setShowModal('create')}
                title={title}
                description={description}
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
          ))
        }
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
