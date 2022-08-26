import React from 'react';
import { ConfigProvider } from '@perfma/heaven';
import zhCN from 'antd/es/locale/zh_CN';
import { render } from 'react-dom';
import FilterTable from './block';

render(
  <ConfigProvider prefixCls="heaven" locale={zhCN} autoInsertSpaceInButton={false}>
    <FilterTable />
  </ConfigProvider>,
  document.getElementById('root'),
);
