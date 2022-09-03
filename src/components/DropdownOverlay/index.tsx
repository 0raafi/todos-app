import React from 'react';
import { Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export interface DropdownOverlayProps {
  items: ItemType[];
}

export default function DropdownOverlay(props: DropdownOverlayProps) {
  const { items } = props || {};
  
  return (
    <Menu items={items} />
  )
}
