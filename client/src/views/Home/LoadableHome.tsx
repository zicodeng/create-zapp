import * as React from 'react';
import Loadable from 'react-loadable';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './Home'),
  loading() {
    return <div>Loading...</div>;
  },
});

export default LoadableHome;
