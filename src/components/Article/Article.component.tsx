import './Article.style.scss';

import React from 'react';
import { useRecoilValue } from 'recoil';

import { darkModeState } from '../../shared/GlobalState';

const Article = ({ item: article }) => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const {
    title,
    date,
    subtitle,
    body,
    statistics: { likes, dislikes },
  } = article;

  return (
    <article className={`Article ${isDarkModeEnabled ? 'Article--dark-mode' : ''}`}>
      <header className="Article__header">
        <h1 className="Article__header__title">{title}</h1>
        <span className="Article__header__date">{formatDate(date)}</span>
        <blockquote className="Article__header__subtitle">
          <p className="Article__header__subtitle__content">{subtitle}</p>
        </blockquote>
      </header>
      <main className="Article__main">
        {body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </main>
      <footer className="Article__footer">
        <button className="Article__footer__vote-up" />
        <span className="Article__footer__rating">{formatRating(likes, dislikes)}</span>
        <button className="Article__footer__vote-down" />
      </footer>
    </article>
  );
};

function formatRating(likes, dislikes) {
  const likeDislikeRatio = likes - dislikes;

  return `${likeDislikeRatio > 0 ? '+' : ''}${likeDislikeRatio}`;
}

function formatDate(dateIsoString) {
  const dateObject = new Date(dateIsoString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const day = dateObject.getDate();

  return `${day}/${month + 1}/${year}`;
}

export default Article;
