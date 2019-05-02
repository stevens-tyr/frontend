/* eslint-disable no-param-reassign */
import React from 'react';
import { Tag } from 'antd';
import Languages from './languages';

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default ({ language, style }) => {
  if (typeof language === 'string') {
    if (language === 'gcc') language = 'C/C++';
    if (!(language in Languages)) {
      language = 'other';
    }
    return (
      <Tag style={style} color={Languages[language]}>
        {capitalizeFirstLetter(language)}
      </Tag>
    );
  }
  return null;
};
