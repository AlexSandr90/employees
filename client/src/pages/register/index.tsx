import React from "react";
import Layout from "../../components/layout";
import { Card, Form, Row, Space, Typography } from "antd";
import CustomInput from "../../components/customInput/CustomInput";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import CustomButton from "../../components/customButton/CustomButton";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

const Register = () => {
  return (
    <Layout>
      <Row align={'middle'} justify={'center'}>
        <Card title={'Sign up'} style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <CustomInput name={'name'} placeholder={'Name'}/>
            <CustomInput
              name={'email'}
              placeholder={'Email'}
              type={'email'}
            />
            <PasswordInput name={'password'} placeholder={'Password'}/>
            <PasswordInput name={'confirmPassword'} placeholder={'Confirm password'}/>
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
              <Link to={Paths.login} style={{marginLeft: '10px'}}>Sign in</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
};

export default Register;