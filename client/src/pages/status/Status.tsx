import { Button, Result, Row } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Statuses: Record<string, string> = {
  created: 'User successfully created',
  updated: 'User uccessfully updated',
  deleted: 'User successfully deleted'
}

const Status = () => {
  const { status } = useParams();


  return (
    <Row
      align={'middle'}
      justify={'center'}
      style={{ widows: '100%' }}
    >
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : 'Not found'}
        extra={
          <Button key={'dashboard'}>
            <Link to={'/'}>To main</Link>
          </Button>
        }
      />
    </Row>
  )
};

export default Status;