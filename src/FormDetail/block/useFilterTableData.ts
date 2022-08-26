import { useAntdTable, useUpdateEffect } from 'ahooks';

const mockData = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const mockFetch = (params) => {
  console.log('params', params);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        object: {
          list: mockData,
          total: 100,
        },
      });
    }, 400);
  });
};

const useFilterTableData = (searchVals) => {
  const getTableData = ({ current, pageSize }) => {
    return mockFetch({
      page: current,
      pageSize,
      ...searchVals,
    })
      .then((res: any) => res.object)
      .then((res) => ({
        total: res.total,
        list: res.list,
      }));
  };

  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
  });

  const { submit } = search;

  useUpdateEffect(() => {
    submit();
  }, [searchVals]);

  return {
    tableProps,
    search,
  };
};

export default useFilterTableData;
