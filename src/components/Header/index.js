import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ siteTitle }) => (
  <header>
    <h1>{siteTitle}</h1>
    <h2>Address Locator Interaction Demo</h2>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
