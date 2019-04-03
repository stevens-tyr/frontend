import React from 'react';

import { Collapse, Icon } from 'antd';
import './styles.scss';

const { Panel } = Collapse;

export default ({ data }) => (
  <Collapse
    className="collapse"
    bordered={false}
    defaultActiveKey={['1']}
    expandIcon={({ isActive }) => (
      <Icon type="caret-left" rotate={isActive ? -90 : 0} />
    )}
  >
    {data.map((item, i) => (
      <Panel
        /* scss wasn't applying to last child */
        style={{ borderRadius: 6 }}
        className="panel"
        header={<h1>{`${item.name}`}</h1>}
        /* eslint-disable-next-line */
        key={i + 1}
      >
        <div>{item.description}</div>
      </Panel>
    ))}
  </Collapse>
);
