import React from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
// import tyr from 'Utils/tyr';
// import { Tag } from 'antd';
import LanguageTag from 'Components/LanguageTag/LanguageTag';
import Submissions from './Submissions';

import './Assignment.scss';

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const Assignments = ({ assignment }) => {
  const {
    name,
    description,
    dueDate,
    language,
    numAttempts,
    submissions,
    supportingFiles
  } = assignment;

  return (
    <div className="assignment">
      <div className="header">
        <h1>{name}</h1>
        <div className="dueDate">
          <h3>Due on: {dayjs(dueDate).format('MMM Do YYYY')}</h3>
          <p>{dayjs(dueDate).fromNow()}</p>
        </div>
      </div>
      <div className="subheader">
        <p>{description}</p>
      </div>
      <div className="subheader">
        <h3>
          Language:
          <LanguageTag style={{ marginLeft: 15 }} language={language} />
        </h3>
      </div>
      <div className="subheader">
        <h3>Total Number of Attempts: {numAttempts}</h3>
        <p>You have {numAttempts - submissions.length} attempts left.</p>
      </div>
      <div className="subheader">
        <h3>Supporting Files:</h3>
        {/* TODO: Use the download file url here. */}
        <a
          className="download-file"
          href="https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf"
          target="_blank"
          download
        >
          {supportingFiles}
        </a>
      </div>
      <div className="subheader">
        <h3>Submissions:</h3>
        {/* submissions.map(s => <p>{JSON.stringify(s)}</p>) */}
        <Submissions submissions={submissions} />
      </div>
    </div>
  );
};

export default Assignments;
