import { Alert } from 'antd';
import React from 'react';
// import React, { useState } from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginFrom from './components/Login';

import styles from './style.less';

const { UserName, Password, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  // const { userLogin = {}, submitting } = props;
  const { submitting } = props;
  //const { status } = userLogin;
  //const [type, setType] = useState<string>('account');

  //登录按钮点击事件
  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      // payload: { ...values, type },
      payload: { ...values },
    });
  };
  return (
    <div className={styles.main}>
      <LoginFrom onSubmit={handleSubmit}>
      {/* <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}> */}
        <div>
          {/* {status === 'error' && loginType === 'account' && !submitting && ( */}
          {status === 'error' && !submitting && (
            <LoginMessage content="邮箱账户或密码错误（admin/ant.design）" />
          )}

          <UserName
            name="userMail"
            placeholder="邮箱: admin or user"
            rules={[
              {
                required: true,
                message: '请输入邮箱!',
              },
            ]}
          />
          <Password
            name="userPwd"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
