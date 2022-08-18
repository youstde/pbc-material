import React from 'react';
import { Table } from '@perfma/heaven';
import Filter from './Filter.tsx';
import useFilterTableData from './useFilterTableData.ts';
import stl from './index.module.scss';

function FilterTable() {
  const { dataSource } = useFilterTableData();
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className={stl.root}>
      <Filter />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default FilterTable;
