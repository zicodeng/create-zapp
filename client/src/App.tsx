import React, { Suspense, memo } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from 'apollo-boost';
import { hot } from 'react-hot-loader/root';

import { Routes, Home, Blog } from 'views';
import { Header } from 'components';

// Set up Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = memo(() => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route component={Header} />
      <Suspense fallback={<div>LOADING...</div>}>
        <Switch>
          <Route exact path={Routes.HOME} component={Home} />
          <Route exact path={Routes.BLOG} component={Blog} />
          <Redirect to={Routes.HOME} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </ApolloProvider>
));

export default hot(App);
