import React from 'react';
import './styles.scss';

/* eslint-disable-next-line */
const Card = props => <div {...props} className={'card ' + props.className} />;

export default Card;
