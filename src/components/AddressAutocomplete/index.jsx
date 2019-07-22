import React, { useState } from 'react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Map from '../Map';

import './styles.scss';

const AddressAutocomplete = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [flipping, setFlipping] = useState(false);
  const [latLng, setLatLng] = useState();

  const handleChange = (address) => {
    setAddressValue(address);
  };

  const handleSelect = (address) => {
    setFlipping(true);

    setTimeout(() => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then((latLngData) => {
          console.log('Success', latLng);
          setLatLng(latLngData);

          setTimeout(() => {
            setFlipping(false);
          }, 10);
        })
        .catch(error => console.error('Error', error));
    }, 190);
  };

  return (
    <div className={`c-address-autocomplete${flipping ? ' is-flipping' : ''}${latLng ? ' has-coordinates' : ''}`}>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`}
        onError={(error) => { console.error(error); }}
        onLoad={() => { if (!scriptLoaded) setScriptLoaded(true); }}
      />

      {scriptLoaded && !latLng ? (
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

      {scriptLoaded && latLng ? <Map latLng={latLng} /> : null}
    </div>
  );
};

export default AddressAutocomplete;
