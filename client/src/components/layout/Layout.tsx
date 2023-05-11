import React from "react";
import styles from './index.module.css';
import { Layout as AntLayout } from 'antd';
import Header from "../header/Header";

const { Content } = AntLayout;

type ChildrenType = {
  children: React.ReactNode
}

const Layout = ({ children }: ChildrenType) => {

  return (
    <div className={styles.main}>
      <Header/>
      <Content
        style={{
          height: '100%'
        }}
      >
        {children}
      </Content>
    </div>
  )
};

export default Layout;