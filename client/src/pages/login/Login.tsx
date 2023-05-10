import React, { useState } from "react";
import Layout from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/customInput/CustomInput';
import PasswordInput from "../../components/passwordInput/PasswordInput";
import CustomButton from "../../components/customButton/CustomButton";
import { Paths } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";

const Login = () => {
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      
      navigate('/');

    } catch (e) {
      console.log('error: ',e);
      const maybeError = isErrorWithMessage(e);

      if (maybeError) {
        setError(e.data.message);
      } else {
        setError('Unknown error')
      }
      navigate('/');
    }
  };


  return (
    <Layout>
      <Row align={'middle'} justify={'center'}>
        <Card title={'Log in'} style={{ width: '30rem' }}>
          <Form onFinish={login}>
            <CustomInput
              name={'email'}
              placeholder={'Email'}
              type={'email'}
            />
            <PasswordInput name={'password'} placeholder={'Password'}/>
            <CustomButton
              onClick={() => null}
              type={'primary'}
              htmlType={'submit'}
            >
              Sign in
            </CustomButton>
          </Form>
          <Space direction={'vertical'} size={'large'}>
            <Typography.Text>
              No account?
              <Link to={Paths.register} style={{ marginLeft: '10px' }}>Sign up</Link>
            </Typography.Text>
            <ErrorMessage message={error}/>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
};

export default Login