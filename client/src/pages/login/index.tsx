import React from "react";
import Layout from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { Link } from 'react-router-dom';
import CustomInput from '../../components/customInput/CustomInput';
import PasswordInput from "../../components/passwordInput/PasswordInput";
import CustomButton from "../../components/customButton/CustomButton";
import { Paths } from "../../paths";

const Login = () => {
  return (
    <Layout>
      <Row align={'middle'} justify={'center'}>
        <Card title={'Log in'} style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
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
              <Link to={Paths.register}>Sign up</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
};

export default Login