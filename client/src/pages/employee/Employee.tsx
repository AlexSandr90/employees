import React, { useState } from 'react';
import {
  Link,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import Layout from 'antd/es/layout/layout';
import {
  Space,
  Modal,
  Divider,
  Descriptions,
} from 'antd';
import CustomButton from '../../components/customButton/CustomButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/isErrorWithMessage';


const Employee = () => {
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!data) {
    return <Navigate to='/' />
  }

  const showModal = () => {
    setIsModalOpen(true)
  };

  const hideModal = () => {
    setIsModalOpen(false)
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
    } catch(e) {
      const maybeError = isErrorWithMessage(e);

      if(maybeError) {
        setError(e.data.message);
      } else {
        setError('Unknown error');
      }
    }
  }

  return
  (
    <Layout>
      <Descriptions
        title={'Information about the employee'}
        bordered
      >
        <Descriptions.Item label={'name'} span={3}>
          {`${data?.firstName} ${data?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label={'age'} span={3}>
          {data?.age}
        </Descriptions.Item>
        <Descriptions.Item label={'address'} span={3}>
          {data?.address}
        </Descriptions.Item>
      </Descriptions>
      {
        user?.id === data?.userId ? (
          <>
            <Divider orientation='left' >Actions</Divider>
            <Space>
              <Link to={`employee/edit/${data?.id}`}>
                <CustomButton
                  shape='round'
                  type='default'
                  icon={<EditOutlined />}
                >
                  Edit
                </CustomButton>
              </Link>
              <CustomButton
                shape='round'
                danger
                onClick={showModal}
                icon={<DeleteOutlined />}
              >
                Delete
              </CustomButton>
            </Space>
          </>
        ) : null
      }
      <ErrorMessage message={error} />
      <Modal
        title={'Confirm the delete'}
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText='Confirm'
        cancelText='Cancel'
      >
        Do you really want to remove an employee from your talent pool?
      </Modal>
    </Layout>
  )
}

export default Employee;