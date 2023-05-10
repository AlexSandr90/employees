import React from 'react';
import { Employee } from '@prisma/client';
import { Card, Form, Space } from 'antd';
import CustomInput from '../customInput/CustomInput';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CustomButton from '../customButton/CustomButton';

type Props<T> = {
  onFinish: (value: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T
}

const EmployeeForm = ({
  title,
  error,
  btnText,
  employee,
  onFinish
}: Props<Employee>) => {

  return (
    <Card title={title} style={{ width: '30px' }} >
      <Form
        name='employee-form'
        onFinish={onFinish}
        initialValues={employee}
      >
        <CustomInput
          type='text'
          name='firstName'
          placeholder='Name'
        />
        <CustomInput
          type='text'
          name='lastName'
          placeholder='Surname'
        />
        <CustomInput
          type='number'
          name='age'
          placeholder='Age'
        />
        <CustomInput
          type='text'
          name='address'
          placeholder='Address'
        />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType='submit' onClick={() => null}>
            {btnText}
          </CustomButton>
        </Space>
      </Form>
    </Card>
  )
};

export default EmployeeForm;