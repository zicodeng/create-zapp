import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import { Routes } from 'views';

import styles from './Header.css';
const cx = classNames.bind(styles);

const Header = () => (
  <header className={cx('header')}>
    <nav className={cx('global-menu')}>
      <ul>
        <li className={cx('menu-item')}>
          <NavLink exact activeClassName={cx('selected')} to={Routes.HOME}>
            HOME
          </NavLink>
        </li>
        <li className={cx('menu-item')}>
          <NavLink exact activeClassName={cx('selected')} to={Routes.BLOG}>
            BLOG
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
