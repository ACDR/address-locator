import React from 'react';

import {
  Layout,
  SEO,
  AddressAutocomplete,
} from '../components';

const IndexPage = () => (
  <Layout>
    <SEO title="Address Locator" />
    <AddressAutocomplete />
  </Layout>
);

export default IndexPage;
