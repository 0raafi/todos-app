import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { ButtonProps, Col, Row, Spin } from 'antd';

import Task from '../../components/Task';
import TodosCreate from './components/Create';
import TodosDelete from './components/Delete';
import TodosUpdate from './components/Update';
import { Plus } from '../../components/Icons';
import Loading from '../../components/Loading';
import GroupTask from '../../components/GroupTask';
import EmptyTask from '../../components/EmptyTask';

import useLocalData from '../../hooks/useLocalData';

import { todosQuery } from '../../graphql/queries/todos';
import { todosItemsQuery } from '../../graphql/queries/todosItems';
import { updateTodosItem } from '../../graphql/mutation/updateTodosItem';

import './style.scss';

export default function Todos() {
  const { dispatch } = useLocalData();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showModal, setShowModal] = useState<'create' | 'update' | 'delete' | null>(null);
  const [todos, setTodos] = useState<any[]>([]);

  const groupTaskType = {
    '0': 'primary',
    '1': 'secondary',
    '2': 'danger',
    '3': 'success'
  }

  const { refetch: loadItems, loading: loadingItem } = useQuery(todosItemsQuery, {
    skip: true
  });

  const { refetch: refetchTodos, loading } = useQuery(todosQuery, {
    onCompleted: async ({ todos }) => {
      handleTodosWithItems(todos);
    }
  })

  const [moveItem] = useMutation(updateTodosItem, {
    onCompleted: handleOnCompleted
  })

  async function handleTodosWithItems(todos = []) {
    const todosWithItems = await toTodosWithItems(todos);
    setTodos(todosWithItems)
  }

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

  function handleOnCompleted() {
    setShowModal(null);
    refetchTodos().then(({ data }) => handleTodosWithItems(data.todos))
  }

  function handleOnItemClick(type: 'create' | 'update' | 'delete' | 'move-left' | 'move-right', value?: any) {
    switch (type) {

      case 'create':
      case 'update':
      case 'delete':
        setShowModal(type)
        setSelectedItem(value)

        break;

      case 'move-left':
      case 'move-right':
        moveItem({
          variables: {
            id: value.id,
            todo_id: value.todo_id,
            target_todo_id: todos[value.current_index + (type == 'move-left' ? -1 : 1)].id
          }
        })

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
      <Spin indicator={<Loading />} spinning={loading || loadingItem}>
        <Row gutter={16}>
          {
            todos.map(({ title, id: todo_id, description, items }, key) => (
              <Col lg={6} key={todo_id}>
                <GroupTask
                  type={groupTaskType[`${key}` as '0' | '1' | '2' | '3'] as any}
                  onAddNew={() => handleOnItemClick('create', { todo_id })}
                  title={title}
                  description={description}
                >
                  {
                    (items || []).map(({ id, name, progress_percentage }: { id: string; name: string; progress_percentage: number }) => (
                      <Task
                        position={key + 1}
                        key={id}
                        taskName={name}
                        progressCount={progress_percentage || 0}
                        onItemClick={(keyItem) => handleOnItemClick(keyItem, { todo_id, id, name, progress_percentage, current_index: key })}
                      />
                    ))
                  }

                  {
                    (items || []).length <= 0 && (
                      <EmptyTask />
                    )
                  }

                </GroupTask>
              </Col>
            ))
          }
        </Row>
      </Spin>

      <TodosCreate
        visible={showModal === 'create'}
        onCancel={() => setShowModal(null)}
        onCompleted={handleOnCompleted}
        todo_id={selectedItem?.todo_id}
      />

      <TodosUpdate
        formValue={{
          name: selectedItem?.name,
          progress_percentage: selectedItem?.progress_percentage
        }}
        id={selectedItem?.id}
        todo_id={selectedItem?.todo_id}
        visible={showModal === 'update'}
        onCancel={() => setShowModal(null)}
        onCompleted={handleOnCompleted}
      />

      <TodosDelete
        id={selectedItem?.id}
        todo_id={selectedItem?.todo_id}
        visible={showModal === 'delete'}
        onCancel={() => setShowModal(null)}
        onCompleted={handleOnCompleted}
      />
    </>
  )
}
