import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import './styles.scss';

const Map = ({ latLng }) => {
  const MapComponent = withGoogleMap(() => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={latLng}
    >
      <Marker position={latLng} />
    </GoogleMap>
  ));

  return (
    <MapComponent
      containerElement={<div />}
      mapElement={<div className="c-map" />}
    />
  );
};

Map.propTypes = {
  latLng: PropTypes.object.isRequired,
};

export default Map;
