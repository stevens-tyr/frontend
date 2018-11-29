import React from 'react';
import './styles.scss';

const CourseNav = ({ department: dept, number, section, name }) => (
  <div className="coursenav">
    <h2>
      {dept}-{number} {section}
    </h2>
    <h3>{name}</h3>
  </div>
);

export default CourseNav;
