import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { pure } from 'recompose';

import { Routes, Home, Blog } from 'views';
import { Header } from 'components';

const App = pure(() => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Route component={Header} />
      <Switch>
        <Route exact path={Routes.HOME} component={Home} />
        <Route path={Routes.BLOG} component={Blog} />
        <Redirect to={Routes.HOME} />
      </Switch>
    </BrowserRouter>
  </Suspense>
));

export default hot(App);
