import React from 'react';
import TableFilterLayout from '@perfma/pbc-filter-layout';

function Filter({ onSearch }) {
  return (
    <TableFilterLayout
      title="知识库管理"
      search={[
        {
          type: 'tabs',
          name: 'type',
          options: [
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
          type: 'input',
          name: 'busisName',
          placeholder: '请输入商家名称',
        },
      ]}
      defaultValue={{
        type: 2,
        busisName: 'wahaha有限公司',
      }}
      onChange={onSearch}
    />
  );
}

export default Filter;
