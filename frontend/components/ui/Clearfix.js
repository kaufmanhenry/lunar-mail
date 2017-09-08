import React from 'react';

export default function Cleafix({ children, ...props }) {
  const beforeStyle = {
    display: 'table'
  };

  const afterStyle = {
    ...beforeStyle,
    clear: 'both'
  };

  return (
    <div {...props}>
      <div style={beforeStyle} />
      {children}
      <div style={afterStyle} />
    </div>
  );
}
