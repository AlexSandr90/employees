import React from "react";
import styles from './header.module.css';
import { Layout, Space, Typography } from 'antd';
import { TeamOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import CustomButton from "../customButton/CustomButton";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon}/>
        <Link to={Paths.home}>
          <CustomButton
            onClick={() => {
            }}
            type='ghost'
          >
            <Typography.Title
              level={1}
            >
              Employees
            </Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton
            onClick={() => {
            }}
            type='ghost'
            icon={<UserOutlined />}
          >
            Sign up
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton
            onClick={() => {
            }}
            type='ghost'
            icon={<LoginOutlined />}
          >
            Sign in
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  )
};

export default Header;