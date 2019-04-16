import React from 'react';
import './Card.scss';

const Card = props => (
  <div
    {...props}
    /* eslint-disable-next-line */
    className={`card ${props.className || ''}`}
  />
);

export default Card;
