import './MainContent.style.scss';

import React from 'react';

import ArticleList from '../ArticleList/ArticleList.component';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs.component';

const MainContent = () => {
  return (
    <main className="MainContent">
      <Breadcrumbs />
      <ArticleList />
    </main>
  );
};

export default MainContent;
