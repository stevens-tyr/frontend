import React from 'react';
import ListItem from '../listItem';

import './styles.scss';

export default props => {
  const { header, subheader, thumbnailColor, cols } = props;
  return (
    <div className="listrow">
      <ListItem
        header={header}
        subheader={subheader}
        thumbnailColor={thumbnailColor}
      />
      {cols.map(c => <span key={c}>{c}</span>)}
    </div>
  );
};
