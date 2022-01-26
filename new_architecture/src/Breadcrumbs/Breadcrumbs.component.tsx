import './Breadcrumbs.style.scss';

import React from 'react';
import { useRecoilValue } from 'recoil';

import { darkModeState } from '../shared/GlobalState';

const Breadcrumbs = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);

  return (
    <nav className={`Breadcrumbs ${isDarkModeEnabled ? 'Breadcrumbs--dark-mode' : ''}`}>
      <button className="Breadcrumbs__item">Blog</button>
      <button className="Breadcrumbs__item">New</button>
      <button className="Breadcrumbs__item">Popular</button>
    </nav>
  );
};

export default Breadcrumbs;
