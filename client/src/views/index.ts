import { lazy } from 'react';

export { default as Routes } from './Routes';

export const Home = lazy(() =>
  import(/* webpackChunkName: 'home' */ './Home/Home'),
);

export const Blog = lazy(() =>
  import(/* webpackChunkName: 'blog' */ './Blog/Blog'),
);
