import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';

import './style.scss';

export default function Loading() {
  return (
    <LoadingOutlined className="loading" spin />
  )
}
