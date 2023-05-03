import React from "react";
import {Form, Input} from 'antd';
import {NamePath} from 'antd/es/form/interface';
import styles from './passwordInput.module.css';
const {Item} = Form;
const {Password} = Input;
type PasswordInputProps = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
}

const PasswordInput = (
  {
    name,
    placeholder,
    dependencies
  }: PasswordInputProps) => {

  return (
    <Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[{
        required: true,
        message: 'Required field',
      }, ({getFieldValue}) => {
        return ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }

            if (name === 'confirm password') {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Passwords must match'));
            } else {
              if (value.length < 6) {
                return Promise.reject(new Error('Password must be longer than 6 characters'));
              }

              return Promise.resolve();
            }
          }
        })
      }]}
    >
      <Password
        placeholder={placeholder}
        size={'large'}
      />
    </Item>
  )
};

export default PasswordInput