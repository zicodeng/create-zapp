import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import classNames from 'classnames/bind';

import { GET_POSTS } from 'graphql/blog/queries';

import styles from './Blog.css';
const cx = classNames.bind(styles);

const Blog = () => {
  const { data, error } = useQuery(GET_POSTS);
  console.log(data, error);
  if (error || !data.posts) {
    return null;
  }
  return (
    <section>
      <ul>
        {data.posts.map(({ author, title, votes }, i) => (
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
  );
};

export default Blog;
