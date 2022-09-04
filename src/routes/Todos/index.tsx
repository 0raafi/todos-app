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
import { todosItemsQuery } from '../../graphql/queries/todosItems';

import './style.scss';

export default function Todos() {
  const { dispatch } = useLocalData();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState<'create' | 'update' | 'delete' | null>(null);
  const [todos, setTodos] = useState<any[]>([]);

  const groupTaskType = {
    '0': 'primary',
    '1': 'secondary',
    '2': 'danger',
    '3': 'success'
  }

  const { refetch: loadItems } = useQuery(todosItemsQuery, {
    skip: true
  });

  useQuery(todosQuery, {
    onCompleted: async ({ todos }) => {
      const todosWithItems = await toTodosWithItems(todos);
      setTodos(todosWithItems)
    }
  })

  async function toTodosWithItems(todosData = []) {
    let newTodos = [];

    newTodos = await Promise.all(todosData.map(async (data: any) => {
      const items = await loadItems({ todo_id: data.id }).then(({ data }) => data.todosItems);

      return {
        ...data,
        items
      }
    }));

    return newTodos

  }

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
          todos.map(({ title, id, description, items }, key) => (
            <Col lg={6} key={id}>
              <GroupTask
                type={groupTaskType[`${key}` as '0' | '1' | '2' | '3'] as any}
                onAddNew={() => setShowModal('create')}
                title={title}
                description={description}
              >
                {
                  (items || []).map(({ id, name, progress_percentage }: { id: string; name: string; progress_percentage: number }) => (
                    <Task
                      position={key + 1}
                      key={id}
                      taskName={name}
                      progressCount={progress_percentage}
                      onItemClick={(keyItem) => handleOnItemClick(keyItem)}
                    />
                  ))
                }

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
