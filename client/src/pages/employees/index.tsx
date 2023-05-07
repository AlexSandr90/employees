import React, { useEffect } from 'react'
import Layout from '../../components/layout';
import CustomButton from '../../components/customButton/CustomButton';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useGetAllEmployeesQuery } from '../../app/services/employees';
import type { ColumnsType } from 'antd/es/table';
import { Employee } from '@prisma/client';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';


const columns: ColumnsType<Employee> = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
];


const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate]);

  return (
    <Layout>
      <CustomButton
        type={'primary'}
        onClick={() => null}
        icon={<PlusCircleOutlined />}
      >
        Added
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(employee) => employee.id}
        onRow={(employee) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${employee.id}`)
          }
        }}
      />
    </Layout>
  )
};

export default Employees;
