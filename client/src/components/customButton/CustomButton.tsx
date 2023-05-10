import React from "react";
import { Button, Form } from 'antd';
import styles from './customButton.module.css';

type ButtonLabelType = {
  children: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round' | undefined;
  icon?: React.ReactNode
}

const CustomButton = (
  {
    type,
    icon,
    shape,
    danger,
    loading,
    onClick,
    children,
    htmlType = 'button'
  }: ButtonLabelType) => {


  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
      >
        {children}
      </Button>
    </Form.Item>
  )
};

export default CustomButton