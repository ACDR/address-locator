import React, { useState } from 'react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Map from '../Map';

import './styles.scss';

const AddressAutocomplete = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [addressSelected, setAddressSelected] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [latLng, setLatLng] = useState(null); // Default as Auckland

  const handleChange = (address) => {
    setAddressValue(address);
  };

  const handleSelect = (address) => {
    setFlipping(true);
    setAddressValue(address);

    setTimeout(() => {
      setAddressSelected(true);
      setFlipping(false);

      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then((latLngData) => {
          setLatLng(latLngData);
        })
        .catch(error => console.error('Error', error));
    }, 200);
  };

  return (
    <div className={`c-address-autocomplete${flipping ? ' is-flipping' : ''}${addressSelected ? ' has-address' : ''}`}>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_API_KEY}&libraries=places`}
        onError={(error) => { console.error(error); }}
        onLoad={() => { if (!scriptLoaded) setScriptLoaded(true); }}
      />

      {scriptLoaded && !addressSelected ? (
        <div className="c-address-autocomplete__field">
          <label htmlFor="addressInput">Address</label>
          <PlacesAutocomplete
            value={addressValue}
            onChange={handleChange}
            onSelect={handleSelect}
            debounce={600}
            searchOptions={{
              types: ['address'],
              componentRestrictions: {
                country: 'nz',
              },
            }}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Enter an address',
                  })}
                />
                <div className="c-address-autocomplete__dropdown">
                  {loading && <div className="c-address-autocomplete__suggestion-item is-loading">Loading...</div>}
                  {suggestions.map(suggestion => (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className: `c-address-autocomplete__suggestion-item${suggestion.active ? ' is-active' : ''}`,
                      })}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      ) : null}

      {scriptLoaded && addressSelected ? <Map latLng={latLng} /> : null}
    </div>
  );
};

export default AddressAutocomplete;
