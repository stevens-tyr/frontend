import React from 'react';
import './styles.scss';

const Card = props => (
  <div
    {...props}
    /* eslint-disable-next-line */
    className={`card ${props.className || ''}`}
  />
);

export default Card;
