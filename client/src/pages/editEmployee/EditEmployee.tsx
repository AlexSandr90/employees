import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';
import Layout from '../../components/layout/Layout';
import { Row } from 'antd';
import EmployeeForm from '../../components/employeeForm/EmployeeForm';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';

const EditEmployee = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [editEmployee] = useEditEmployeeMutation();


  if (isLoading) {
    return <span>Loading...</span>
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee
      };

      await editEmployee(editedEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (e) {
      const maybeError = isErrorWithMessage(e);

      if (maybeError) {
        setError(e.data.message);
      } else {
        setError('Unknown error');
      }
    }
  }

  return (
    <Layout>
      <Row align={'middle'} justify={'center'} >
        <EmployeeForm
          title='Edid employee'
          btnText='Edit'
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  )
};

export default EditEmployee;