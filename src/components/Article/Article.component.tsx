import './Article.style.scss';

import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';

import { darkModeState } from '../../shared/GlobalState';
import { NostrEvent } from 'src/application/interfaces';

interface ArticleProps {
  item?: NostrEvent;
}

const Article: React.FC<ArticleProps> = ({ item }) => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const navigate = useNavigate();

  return (
    <article className={`Article ${isDarkModeEnabled ? 'Article--dark-mode' : ''}`}>
      <Card
        size="small"
        title={
          <div>
            <h1
              className="Article__header__title"
              style={{ fontSize: '25px', color: isDarkModeEnabled ? 'white' : 'black' }}
            >
              {'Default title'}
            </h1>
            <span
              className="Article__header__date"
              style={{ color: isDarkModeEnabled ? 'white' : 'black' }}
            >
              {formatDate(item?.created_at)}
            </span>
          </div>
        }
        style={{
          backgroundColor: isDarkModeEnabled ? 'black' : 'white',
          width: 1050,
          color: isDarkModeEnabled ? 'white' : 'black',
        }}
        onClick={() => navigate(`/article/${item?.id}`)}
      >
        <main className="Article__main" style={{}}>
          {<p>{item?.content}</p>}
        </main>
        <footer className="Article__footer">
          <button className="Article__footer__vote-up" />
          <span className="Article__footer__rating">{formatRating(5, 10)}</span>
          <button className="Article__footer__vote-down" />
        </footer>
      </Card>
    </article>
  );
};

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
