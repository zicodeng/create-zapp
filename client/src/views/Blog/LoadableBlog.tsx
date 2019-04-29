import * as React from 'react';
import Loadable from 'react-loadable';

const LoadableBlog = Loadable({
  loader: () => import(/* webpackChunkName: 'blog' */ './Blog'),
  loading() {
    return <div>Loading...</div>;
  },
});

export default LoadableBlog;
