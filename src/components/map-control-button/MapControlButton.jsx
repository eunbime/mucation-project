import React from 'react';
import { StMapButtonBox, StButton } from './MapControlButton.styles';
import LocationSearch from './LocationSearch';
import { ReactComponent as Location } from 'styles/img/map/location.svg';

const MapControlButton = ({ state, setState, currentLocation, mapRef }) => {
  return (
    <StMapButtonBox>
      <LocationSearch mapRef={mapRef} />
      <StButton type="button" onClick={() => setState({ ...state, center: { ...currentLocation } })}>
        <Location />
      </StButton>
    </StMapButtonBox>
  );
};

export default MapControlButton;
