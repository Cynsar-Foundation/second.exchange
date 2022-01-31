import './ArticleView.style.scss';

import React, { useState } from 'react';
import { useLocation } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { useRecoilValue } from 'recoil';

import ArticleService from 'src/shared/ArticleService';
import { darkModeState } from '../../shared/GlobalState';

function formatDate(dateIsoString: any) {
  const dateObject = new Date(dateIsoString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const day = dateObject.getDate();

  return `${day}/${month + 1}/${year}`;
}

export const ArticleView = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const getRouteSlug = () => {
    const location = useLocation();
    if (location.pathname.indexOf("article") >= 0)
      //@ts-ignore
      return Number(/[^/]*$/.exec(location.pathname)[0]);
  }

  const getArticle = async (id: number | undefined) => {
    if (id === undefined)
      return
    await ArticleService.getById(id)
      .then((result) => {
        setArticle(result);
        setArticleLoaded(true);
        return result;
      });
  }

  const [article, setArticle] = useState<any>();
  const [articleLoaded, setArticleLoaded] = useState(false);
  getArticle(getRouteSlug());

  return(
      <div className="article-view">
            {articleLoaded && 
              <div className="article-view__container">
                {/* @ts-ignore */}
                <h1 className="article-view__title" style={{ color: (isDarkModeEnabled ? "white" : "black")}}>{article.title}</h1>
                {/* @ts-ignore */}
                <h4 className="article-view__date">{formatDate(article.date)}</h4>
                {/* @ts-ignore */}
                <h3 className="article-view__subtitle" style={{ color: (isDarkModeEnabled ? "white" : "black")}}>{article.subtitle}</h3>
                {/* @ts-ignore */}
                <p className="article-view__body"><ReactMarkdown>{String(article.body)}</ReactMarkdown></p>
              </div>}
      </div>
  )
}
