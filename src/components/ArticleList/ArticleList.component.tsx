import './ArticleList.style.scss';

import React, { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useRecoilValue } from 'recoil';

import ArticleService from '../../shared/ArticleService';
import { articleByIdQuery } from '../../shared/GlobalState';
import { nostrEventState } from 'src/application/states/relay.state';
import Article from '../Article/Article.component';
import { NostrEvent } from 'src/application/interfaces';


interface Iprops {
  props?: NostrEvent[],
}

const ArticleList: React.FC<Iprops> = (props) => {
  // const article = useRecoilValueLoadable(articleByIdQuery(3));
  const [articles, setArticles] = useState([]);
  const nostrArticles = useRecoilValue(nostrEventState);

  // const renderArticles = () => {
  //   switch (article.state) {
  //     case 'hasValue':
  //       const articleData = article.contents;
  //       // @ts-ignore
  //       return <Article key={articleData.id} item={articleData} />;
  //     default:
  //     case 'loading':
  //     case 'hasError':
  //       return <div>Loading...</div>;
  //   }
  // };

  // Fetch all articles when the component mounts for the first time
  useEffect(() => {
    const fetchArticles = async () => {
      const result = nostrArticles;
      console.log("FROM ARTICLE LIST: ", result);
      // const result = await ArticleService.getAll();
      // @ts-ignore
      setArticles(result);
    };

    fetchArticles();
    console.log("1");
  }, [nostrArticles]);

  return (
    <div className="ArticleList">
      {/*renderArticles()*/}
      {nostrArticles.map(articleData => (
        // @ts-ignore
        <Article key={articleData.id} item={articleData} />
      ))}
    </div>
  );
};

export default ArticleList;
