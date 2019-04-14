import * as React from 'react';
import { graphql } from 'react-apollo';
import { compose, mapProps, branch, renderComponent, pure } from 'recompose';
import classNames from 'classnames/bind';

import { GET_POSTS } from 'graphql/blog/queries';

import styles from './Blog.css';
const cx = classNames.bind(styles);

const Blog = compose(
  graphql(GET_POSTS, { name: 'getPosts' }),
  mapProps(({ getPosts: { posts } }) => ({ posts })),
  branch(
    ({ posts }) => !Boolean(posts),
    renderComponent(() => <div>Loading...</div>),
  ),
  pure,
)(({ posts }) => (
  <section>
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
  </section>
));

export default Blog;
