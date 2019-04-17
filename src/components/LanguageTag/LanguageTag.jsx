import React from 'react';
import { Tag } from 'antd';
import Languages from './languages';

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default ({ language, style }) => {
  if (typeof language === 'string') {
    if (language in Languages) {
      return (
        <Tag style={style} color={Languages[language]}>
          {capitalizeFirstLetter(language)}
        </Tag>
      );
    }
    return (
      <Tag style={style} color={Languages.other}>
        {capitalizeFirstLetter(language)}
      </Tag>
    );
  }
  return <p>Invalid input language!</p>;
};
