import React from "react";
import { Alert } from "antd";

type ErrorMessageTypeProps = {
  message?: string
}

export const ErrorMessage = ({ message }: ErrorMessageTypeProps) => message ?
  <Alert message={message} type={'error'}/> : null;
