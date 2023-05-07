import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { Row } from 'antd';
import EmplyeeForm from '../../components/employeeForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';


const AddEmployee = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();

      navigate(`/${Paths.status}/created`);
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
      <Row align={'middle'} justify={'center'}>
        <EmplyeeForm
          title='Added employee'
          btnText='Added'
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
};

export default AddEmployee;