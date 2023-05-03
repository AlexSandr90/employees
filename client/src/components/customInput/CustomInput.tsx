import React from "react";
import styles from './customInput.module.css';
import { Form, Input } from 'antd';


type CustomInputProps = {
  name: string;
  placeholder: string;
  type?: string;
}

const CustomInput = (
  {
    name,
    placeholder,
    type = 'text'
  }: CustomInputProps) => {

  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: 'Required field' }]}
      shouldUpdate={true}
    >
      <Input
        placeholder={placeholder}
        type={type}
        size={'large'}
      />
    </Form.Item>
  )
};

export default CustomInput;