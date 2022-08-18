import React from 'react';
import { Button, Form, Select, Input, DatePicker } from '@perfma/heaven';
import TableFilterLayout from './pbc/TableFilterLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;

function Filter() {
  const handleOnChange = (vals) => {
    console.log('vals', vals);
  }

  return (
    <TableFilterLayout
      title='知识库管理'
      search={{
        type: 'selectInput',
        name: 'type',
        placeholder: '请输入商家名称',
        options: [
          {
            label: '全部',
            value: 'all'
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
          }
        ]
      }}
      btns={[
        <Button type='primary'>新建项目</Button>
      ]}
      extra={[
        <div>extra</div>
      ]}
      mainFilterOptions={{
        isRT: false,
        isFold: false,
        initialValues: {
          productType: 'one',
          userName: 'jack',
          productName: '123',
        }
      }}
      defaultValue={{
        type: {
          inputVal: 2,
          selectVal: 'all',
        },
      }}
      onChange={handleOnChange}
    >
      <Form.Item label="告警类型" name="productType">
        <Select>
          <Option value='one'>one</Option>
          <Option value='two'>two</Option>
        </Select>
      </Form.Item>
      <Form.Item label="修改人" name="userName">
        <Select>
          <Option value='jack'>jack</Option>
          <Option value='tom'>tom</Option>
        </Select>
      </Form.Item>
      <Form.Item label="商品名称" name="productName">
        <Input />
      </Form.Item>
      <Form.Item label="时间范围" name="time">
        <RangePicker />
      </Form.Item>
      {/* <Form.Item label="时间范围" name="time2">
        <RangePicker />
      </Form.Item>
      <Form.Item label="时间范围" name="time4">
        <RangePicker />
      </Form.Item> */}
    </TableFilterLayout>
  );
}

export default Filter;
