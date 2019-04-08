/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import React from 'react';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Collapse, Icon, Button, Empty } from 'antd';
import Card from 'Components/Card';
import './styles.scss';

dayjs.extend(advancedFormat);

const { Panel } = Collapse;

export default ({ data, role }) => {
  if (data.length === 0) {
    return (
      <Card>
        <Empty description="No assignments" />
      </Card>
    );
  }

  return (
    <Collapse
      className="collapse"
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <Icon type="caret-left" rotate={isActive ? -90 : 0} />
      )}
    >
      {data.map((a, i) => (
        <Panel
          /* scss border radius wasn't applying to last child */
          style={{ borderRadius: 6 }}
          className="panel"
          header={
            <div className="panel-header">
              <div className="assignment-name">{`Assignment ${i + 1}: ${
                a.name
              }`}</div>
              <div className="assignment-due">{`Due: ${dayjs(a.dueDate).format(
                'MMM Do YYYY'
              )}`}</div>
            </div>
          }
          key={a._id}
        >
          <div className="panel-body">
            <div className="panel-label">Assignment Description:</div>
            <div>{a.description}</div>
            {a.language && (
              <div>
                <span className="required-lang">Required Language: </span>
                <span>{a.language}</span>
              </div>
            )}

            {a.supportingFiles && (
              <>
                <div className="panel-label">Supporting File:</div>
                <div>{a.supportingFiles}</div>
              </>
            )}

            <div className="panel-label">Submissions:</div>
            <div>{`Number of Submissions: ${a.numAttempts}`}</div>
            <div style={{ color: 'red' }}>IMPLEMENT SUBMISSIONS</div>

            {role !== 'teacher' && (
              <div className="button-container">
                <Button type="primary">Submit Assignment</Button>
              </div>
            )}
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};
