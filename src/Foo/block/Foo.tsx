import React from 'react';
import stl from './index.module.scss';

export default ({ title }: { title: string }) => (
  <div className={stl.root}>
    <div className={stl.title}>{title}</div>
  </div>
);
