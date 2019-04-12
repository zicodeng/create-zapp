import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

// Import fonts
import 'typeface-roboto';

// Import global style
import 'normalize.css';
import './styles/global.css';

import App from './App';

// Set up Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app'),
);
