import React from 'react';
import { Col, Divider, Progress, Row, Space } from 'antd';

import TaskAction from './Action';

import './style.scss';

export interface TaskProps {
  position?: number;
  taskName: string;
  progressCount: number;
  onItemClick: (key: 'update' | 'delete' | 'move-right' | 'move-left') => void;
}

export default function Task(props: TaskProps) {
  const { taskName, progressCount, onItemClick, position } = props || {};

  return (
    <div className="card-task">
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <div className="text-m bold">{taskName}</div>
        <Divider dashed style={{ margin: 0 }} />
        <Row gutter={24} justify="space-between" align="middle" wrap={false}>
          <Col flex="auto"><Progress percent={progressCount} /></Col>
          <Col className="task-action-wrapper"><TaskAction position={position} onItemClick={onItemClick} /></Col>
        </Row>
      </Space>
    </div>
  )
}
