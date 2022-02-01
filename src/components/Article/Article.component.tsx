import './Article.style.scss';

import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';

import { darkModeState } from '../../shared/GlobalState';

interface ArticleProps {
  item?: any,
  fromNavigation?: boolean
}

const defaultProps: ArticleProps = {
  fromNavigation: false
}

const Article: React.FC<ArticleProps> = ({ item: article }) => {

  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const navigate = useNavigate();

    var {
      id,
      title,
      date,
      subtitle,
      body,
      statistics: { likes, dislikes },
    } = article;

  return (
   <article className={`Article ${isDarkModeEnabled ? 'Article--dark-mode' : ''}`}>
      <Card 
        size="small" 
        title={
          <div>
            <h1 className="Article__header__title">{title}</h1>
            <span className="Article__header__date">{formatDate(date)}</span>
          </div>
        } 
        style={{ width: 1050 }}
        onClick={() => navigate(`/article/${id}`)}
      >
        <main className="Article__main">
          {body.map((paragraph: any, index: any) => (
            <p key={index}>{paragraph}</p>
          ))}
        </main>
          <footer className="Article__footer">
            <button className="Article__footer__vote-up" />
              <span className="Article__footer__rating">{formatRating(likes, dislikes)}</span>
            <button className="Article__footer__vote-down" />
          </footer>
      </Card>
    </article>
  );
};

Article.defaultProps = defaultProps;

function formatRating(likes: any, dislikes: any) {
  const likeDislikeRatio = likes - dislikes;

  return `${likeDislikeRatio > 0 ? '+' : ''}${likeDislikeRatio}`;
}

function formatDate(dateIsoString: any) {
  const dateObject = new Date(dateIsoString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const day = dateObject.getDate();

  return `${day}/${month + 1}/${year}`;
}

export default Article;
