import React from 'react';
import { ConfigProvider } from '@perfma/heaven';
import zhCN from 'antd/es/locale/zh_CN';
import { render } from 'react-dom';
import Demo from './demo/baseDemo.tsx';


render(
  (
    <ConfigProvider
      prefixCls="heaven"
      locale={zhCN}
      autoInsertSpaceInButton={false}
    >
      <Demo />
    </ConfigProvider>
  )
, document.getElementById('root'));
