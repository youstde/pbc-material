import React from 'react';
import { Button, Form, Select, Input, DatePicker } from '@perfma/heaven';
import TableFilterLayout from '@perfma/pbc-filter-layout';

const { Option } = Select;
const { RangePicker } = DatePicker;

function Filter() {
  const handleOnChange = (vals) => {
    console.log('vals', vals);
  };

  return (
    <TableFilterLayout
      title="知识库管理"
      search={[
        {
          type: 'tabs',
          name: 'type',
          placeholder: '请输入商家名称',
          options: [
            {
              label: '全部',
              value: 'all',
            },
            {
              label: 'Small',
              value: 1,
            },
            {
              label: 'Middle',
              value: 2,
            },
            {
              label: 'Large',
              value: 3,
            },
          ],
        },
        {
          type: 'selectInput',
          name: 'busisName',
          placeholder: '请输入商家名称',
          options: [
            {
              label: '全部',
              value: 'all',
            },
            {
              label: 'Small',
              value: 1,
            },
            {
              label: 'Middle',
              value: 2,
            },
            {
              label: 'Large',
              value: 3,
            },
          ],
        },
      ]}
      btns={[<Button type="primary">新建项目</Button>]}
      extra={[<div>extra</div>]}
      defaultValue={{
        type: 2,
        busisName: {
          inputVal: 'wahaha有限公司',
          selectVal: 'all',
        },
      }}
      onChange={handleOnChange}
    />
  );
}

export default Filter;
