import './ArticleList.style.scss';

import React, { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import Article from '../Article/Article.component';
import ArticleService from '../shared/ArticleService';
import { articleByIdQuery } from '../shared/GlobalState';

const ArticleList = () => {
  const article = useRecoilValueLoadable(articleByIdQuery(3));
  const [articles, setArticles] = useState([]);

  const renderArticles = () => {
    switch (article.state) {
      case 'hasValue':
        const articleData = article.contents;
        return <Article key={articleData.id} item={articleData} />;
      default:
      case 'loading':
      case 'hasError':
        return <div>Loading...</div>;
    }
  };

  // Fetch all articles when the component mounts for the first time
  useEffect(() => {
    const fetchArticles = async () => {
      const result = await ArticleService.getAll();

      setArticles(result);
    };

    fetchArticles();
  }, []);

  return (
    <div className="ArticleList">
      {renderArticles()}
      {articles.map(articleData => (
        <Article key={articleData.id} item={articleData} />
      ))}
    </div>
  );
};

export default ArticleList;
