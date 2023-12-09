import React from 'react';
import { Controlbar } from '../location/Location.styles';

const CustomControlBar = ({ mapRef, setLevel }) => {
  return (
    <Controlbar
      type="range"
      defaultValue="4"
      min="1"
      max="8"
      onChange={(e) => {
        mapRef.current.setLevel(e.currentTarget.value, { animate: true });
        setLevel(mapRef.current.getLevel());
      }}
    />
  );
};

export default CustomControlBar;
