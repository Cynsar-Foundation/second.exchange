import React, { useState, useEffect } from 'react';
import { useRecoilValueLoadable } from "recoil";
import { selectedArticleState } from "../../application/state/SelectedArticleState";

export const ArticlePage = () => {
const article = useRecoilValueLoadable(selectedArticleState);
const [articlesLoaded, setArticlesLoaded] = useState(false);

  useEffect(() => {
    if(article.contents !== null)
        setArticlesLoaded(true);
  }, [article])

  return(
      <div>
          {articlesLoaded && article.contents.id}
      </div>
  )
}
