import React from 'react';

import './styles.scss';

export default props => {
  const { thumbnailColor, header, subheader } = props;
  return (
    <div className="listelement">
      <div className={`thumbnail ${thumbnailColor}`} />
      <div className="headers">
        <h3>{header}</h3>
        <p className="subheader">{subheader}</p>
      </div>
    </div>
  );
};
