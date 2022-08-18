import React, { ReactElement, useMemo } from 'react';
import { Form } from '@perfma/heaven';
import SearchBlock from './SearchBlock';
import stl from './index.module.scss';

interface IOptions {
  label: string;
  value: any;
}
interface ISearch {
  type: 'input' | 'selectInput' | 'tabs';
  name: string;
  placeholder: string;
  options?: IOptions[];
}

interface IMainFilterOptions {
  isRT: boolean;
  initialValues?: any;
}

interface IProps {
  onChange: (vals: any) => void;
  title?: string | ReactElement;
  search?: ISearch;
  btns?: ReactElement | any;
  extra?: ReactElement | any;
  children?: ReactElement[] | ReactElement;
  mainFilterOptions?: IMainFilterOptions;
  defaultValue?: any;
}

function TableFilterLayout({ 
  title,
  search,
  btns,
  extra,
  mainFilterOptions,
  children,
  defaultValue,
  onChange
}: IProps) {

  const btnsBlock = useMemo(() => {
    if (btns) {
      return <div className={stl.btnsContainer}>{btns}</div>;
    }
    return '';
  }, [btns]);

  const extraBlock = useMemo(() => {
    if (extra) return <div style={{paddingLeft: '8px'}}>{extra}</div>;
    return '';
  }, []);

  const formatFormVals = (vals) => {
    return Object.keys(vals).reduce((draft, key) => { 
      if (vals[key] !== undefined) {
        draft[key] = vals[key];
      }
      return draft;
     }, {});
  }

  const handleRTSearch = (_, allVals) => {
    onChange(formatFormVals(allVals));
  }

  const mainFilterBlock = useMemo(() => {
    if (!children) return '';
    const { isRT, initialValues={} } = mainFilterOptions;

    if(isRT) {
      return (
        <div className={stl.mainFilter}>
          <Form
            colon={false}
            layout='inline'
            onValuesChange={handleRTSearch}
            initialValues={initialValues}
          >
            {children}
          </Form>
        </div>
      )
    }

    return (
      <div className={stl.mainFilter}>
        <Form
          colon={false}
          layout='horizontal'
        >
          {children}
        </Form>
      </div>
    )

  }, [children, mainFilterOptions]);

  return (
    <div className={stl.root}>
      <div className={stl.mainHeader}>
        <div className={stl.mainLeft}>{title}</div>
        <div className={stl.mainRight}>
          <SearchBlock 
            search={search}
            onChange={onChange}
            defaultVal={defaultValue}
          />
          {
            btnsBlock
          }
          {
            extraBlock
          }
        </div>
      </div>
      {
        mainFilterBlock
      }
    </div>
  );
}

export default TableFilterLayout;
