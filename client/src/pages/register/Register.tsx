import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Card, Form, Row, Space, Typography } from "antd";
import CustomInput from "../../components/customInput/CustomInput";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import CustomButton from "../../components/customButton/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";


type RegisterData = Omit<User, 'id'> & { confirmPassword: string };


const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()

      navigate('/');
    } catch (e) {
      const maybeError = isErrorWithMessage(e);

      if (maybeError) {
        setError(e.data.message);
      } else {
        setError('Unknown error')
      }
      navigate('/');
    }
  }

  return (
    <Layout>
      <Row align={'middle'} justify={'center'}>
        <Card title={'Sign up'} style={{ width: '30rem' }}>
          <Form onFinish={register}>
            <CustomInput name={'name'} placeholder={'Name'} />
            <CustomInput
              name={'email'}
              placeholder={'Email'}
              type={'email'}
            />
            <PasswordInput name={'password'} placeholder={'Password'} />
            <PasswordInput name={'confirmPassword'} placeholder={'Confirm password'} />
            <CustomButton
              onClick={() => null}
              type={'primary'}
              htmlType={'submit'}
            >
              Sign up
            </CustomButton>
          </Form>
          <Space direction={'vertical'} size={'large'}>
            <Typography.Text>
              Already have an account?
              <Link to={Paths.login} style={{ marginLeft: '10px' }}>Sign in</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
};

export default Register;