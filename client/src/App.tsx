import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { graphql } from 'react-apollo';
import { compose, mapProps, branch, renderComponent } from 'recompose';
import classNames from 'classnames/bind';

import { GET_POSTS } from 'graphql/blog/queries';

import styles from './App.css';
const cx = classNames.bind(styles);

const App = compose(
  graphql(GET_POSTS, { name: 'getPosts' }),
  mapProps(({ getPosts: { posts } }) => ({ posts })),
  branch(
    ({ posts }) => !Boolean(posts),
    renderComponent(() => <div>Loading...</div>),
  ),
)(({ posts }) => (
  <main>
    <h1 className={cx('app-title')}>Create Zapp</h1>
    <ul>
      {posts.map(({ author, title, votes }, i) => (
        <li key={i} className={cx('post')}>
          <div className={cx('author-name')}>
            <span>{author.firstName}</span>
            <span>{author.lastName}</span>
          </div>
          <span className={cx('post-title')}>{title}</span>
          <span className={cx('votes')}>{votes}</span>
        </li>
      ))}
    </ul>
  </main>
));

export default hot(App);
