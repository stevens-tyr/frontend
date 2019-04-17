import React from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

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
    <>
      <h1>{name}</h1>
      <h2>Due on: {dayjs(dueDate).format('MMM Do YYYY')}</h2>
      <h3>Language: {language}</h3>
      <h3>Total Number of Attempts: {numAttempts}</h3>
      <p>{description}</p>
      <h3>Supporting Files:</h3>
      <p>{supportingFiles}</p>
      <h3>Submissions:</h3>
      {submissions.map(s => <p>{JSON.stringify(s)}</p>)}
    </>
  );
};

export default Assignments;
