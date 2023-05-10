import React from "react";
import styles from './header.module.css';
import { Layout, Space, Typography } from 'antd';
import { TeamOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import CustomButton from "../customButton/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
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
      {
        user
          ? (
            <CustomButton
              type="ghost"
              icon={<LoginOutlined />}
              onClick={onLogoutClick}
            >
              Log out
            </CustomButton>
          )
          : (
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
          )
      }

    </Layout.Header>
  )
};

export default Header;