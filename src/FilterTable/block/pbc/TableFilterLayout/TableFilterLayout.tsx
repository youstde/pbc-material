import React, { ReactElement, useMemo, useState } from 'react';
import { Form, Row, Col, Button } from '@perfma/heaven';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
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
  isFold: boolean;
  initialValues?: any;
  showBgc?: boolean;
  isExpert?: boolean;
}

interface IProps {
  onChange: (vals: any) => void;
  title?: string | ReactElement;
  search?: ISearch;
  btns?: ReactElement | any;
  extra?: ReactElement | any;
  children?: ReactElement[] | any;
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
  onChange,
}: IProps) {
  const [isFlodOpen, setIsFlodOpen] = useState(false);
  const [isExpertOpen, setIsExpertOpen] = useState(false);

  const btnsBlock = useMemo(() => {
    if (btns) {
      return <div className={stl.btnsContainer}>{btns}</div>;
    }
    return '';
  }, [btns]);

  const extraBlock = useMemo(() => {
    if (extra) return <div style={{ paddingLeft: '8px' }}>{extra}</div>;
    return '';
  }, []);

  const formatFormVals = (vals) => {
    return Object.keys(vals).reduce((draft, key) => {
      if (vals[key] !== undefined) {
        draft[key] = vals[key];
      }
      return draft;
    }, {});
  };

  const handleRTSearch = (_, allVals) => {
    onChange(formatFormVals(allVals));
  };

  const handleExpertClick = () => {
    setIsExpertOpen(!isExpertOpen);
  }

  const createCommonChildren = () => {
    const { isFold } = mainFilterOptions;
    if (children.length) {
      const nextChildren = [];
      const fullLineCount = Math.floor(children.length / 4);
      const remainCount = children.length % 4;

      if (isFold && !isFlodOpen) {
        // 需要折叠
        if (fullLineCount) {
          nextChildren.push(
            <Row className={stl.singleRow}>
              <Col span={18}>
                <Row>
                  <Col span={8}>{children[0]}</Col>
                  <Col span={8}>{children[1]}</Col>
                  <Col span={8}>{children[2]}</Col>
                </Row>
              </Col>
              <Col span={6} className={stl.btnsBox}>
                <Button style={{ marginRight: '8px' }}>重置</Button>
                <Button type="primary">查询</Button>
                <Button onClick={() => setIsFlodOpen(true)} type='link'>更多<DownOutlined /></Button>
              </Col>
            </Row>,
          );
          return nextChildren;
        }
      }

      for (let i = 0; i < fullLineCount; i++) {
        nextChildren.push(
          <Row className={stl.singleRow}>
            <Col span={6}>{children[i * 4]}</Col>
            <Col span={6}>{children[i * 4 + 1]}</Col>
            <Col span={6}>{children[i * 4 + 2]}</Col>
            <Col span={6}>{children[i * 4 + 3]}</Col>
          </Row>,
        );
      }

      if (remainCount) {
        const partChildren = [];
        let partChildCount = 0;
        while (partChildCount < remainCount) {
          partChildren.push(<Col span={8}>{children[fullLineCount * 4 + partChildCount]}</Col>);
          partChildCount++;
        }
        nextChildren.push(
          <Row className={stl.singleRow}>
            <Col span={18}>
              <Row>{partChildren}</Row>
            </Col>
            <Col span={6} className={stl.btnsBox}>
              <Button style={{ marginRight: '8px' }}>重置</Button>
              <Button type="primary">查询</Button>
              {
                fullLineCount && isFold ? (<Button onClick={() => setIsFlodOpen(false)} type='link'>收起<UpOutlined /></Button>): null
              }
            </Col>
          </Row>,
        );
      } else {
        nextChildren.push(
          <Row justify="end" className={stl.singleRow}>
            <Col span={6} className={stl.btnsBox}>
              <Button style={{ marginRight: '8px' }}>重置</Button>
              <Button type="primary">查询</Button>
              {
                fullLineCount && isFold ? (<Button onClick={() => setIsFlodOpen(false)} type='link'>收起<UpOutlined /></Button>): null
              }
            </Col>
          </Row>,
        );
      }
      return nextChildren;
    }
    return children;
  };

  const mainFilterBlock = useMemo(() => {
    if (!isExpertOpen && mainFilterOptions.isExpert) return '';
    if (!children) return '';
    const { isRT, initialValues = {} } = mainFilterOptions;

    if (isRT) {
      return (
        <div className={`${stl.baseMainFilter} ${mainFilterOptions.showBgc ? stl.grayBg: ''}`}>
          <Form
            colon={false}
            layout="inline"
            onValuesChange={handleRTSearch}
            initialValues={initialValues}
          >
            {children}
          </Form>
        </div>
      );
    }

    return (
      <div className={`${stl.baseMainFilter} ${stl.commonMainFilter} ${mainFilterOptions.showBgc ? stl.grayBg: ''}`}>
        <Form colon={false} layout="horizontal">
          {createCommonChildren()}
        </Form>
      </div>
    );
  }, [children, mainFilterOptions, isFlodOpen, isExpertOpen]);

  return (
    <div className={stl.root}>
      <div className={stl.mainHeader}>
        <div className={stl.mainLeft}>{title}</div>
        <div className={stl.mainRight}>
          {mainFilterOptions.isExpert && <Button type='link' onClick={handleExpertClick}>高级筛选<DownOutlined /></Button>}
          {search && <SearchBlock search={search} onChange={onChange} defaultVal={defaultValue} />}
          {btnsBlock}
          {extraBlock}
        </div>
      </div>
      {mainFilterBlock}
    </div>
  );
}

export default TableFilterLayout;
