import React, { useEffect, useState } from 'react';
import { Input, Select, Radio } from '@perfma/heaven';
import { SearchOutlined } from '@ant-design/icons';
import stl from './search.module.scss';

function SearchBlock({ defaultVal, search, onChange }) {
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('');

  const handleRadioChange = (e) => {
    const { name } = search;
    setInputVal(e.target.value);
    onChange({
      [name]: e.target.value,
    });
  };

  const handleSearch = () => {
    const { name } = search;
    onChange({
      [name]: inputVal,
    });
  };

  const handleSelectInputSearch = () => {
    const { name } = search;
    onChange({
      [name]: {
        inputVal,
        selectVal,
      }
    });
  }

  useEffect(() => {
    const { name, type } = search;
    if (defaultVal && defaultVal[name]) {
      if (type === 'selectInput') {
        if (typeof defaultVal[name] !== 'object') {
          console.error('当search的type为【selectInput】的时候default中默认值类型必须为{ inputVal: any, selectVal: any }');
          return;
        }
        setInputVal(defaultVal[name].inputVal);
        setSelectVal(defaultVal[name].selectVal);
      } else {
        setInputVal(defaultVal[name]);
      }
    }
  }, [defaultVal, search]);

  if (search) {
    const { type, placeholder, options } = search;
    switch (type) {
      case 'input':
        return (
          <div className={stl.searchInputContainer}>
            <Input
              className={stl.commonInput}
              placeholder={placeholder}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onPressEnter={handleSearch}
            />
            <div className={stl.searchIcon} onClick={handleSearch}>
              <SearchOutlined />
            </div>
          </div>
        );
      case 'selectInput':
        return (
          <div className={stl.searchInputContainer}>
            <Input
              className={stl.commonInput}
              placeholder={placeholder}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onPressEnter={handleSearch}
              addonBefore={
                <Select value={selectVal} onChange={(val) => setSelectVal(val)} className={stl.inputSelect} options={options} />
              }
            />
            <div className={stl.searchIcon} onClick={handleSelectInputSearch}>
              <SearchOutlined />
            </div>
          </div>
        );
      case 'tabs':
        return (
          <Radio.Group value={inputVal} onChange={handleRadioChange} style={{ marginBottom: 16 }}>
            {options.map((it) => (
              <Radio.Button value={it.value}>{it.label}</Radio.Button>
            ))}
          </Radio.Group>
        );
      default:
        return <></>;
    }
  }
  return <></>;
}

export default SearchBlock;
