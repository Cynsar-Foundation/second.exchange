import './ArticleList.style.scss';

import React from 'react';
import { useRecoilValue } from 'recoil';

import { nostrEventState } from 'src/application/states/relay.state';
import Article from '../Article/Article.component';

const ArticleList: React.FC = () => {
  const nostrArticles = useRecoilValue(nostrEventState);

  return (
    <div className="ArticleList">
      {nostrArticles.map(articleData => (
        <Article key={articleData.id} item={articleData} />
      ))}
    </div>
  );
};

export default ArticleList;
