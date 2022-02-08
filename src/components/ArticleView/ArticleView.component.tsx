import './ArticleView.style.scss';

import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { useRecoilValue } from 'recoil';
import { inject } from 'njct';
import { useNavigate } from 'react-router-dom';

// import ArticleService from 'src/shared/ArticleService';
import { darkModeState } from '../../shared/GlobalState';
import { RelayService } from 'src/application/interfaces';
import { blogContentState } from 'src/application/state';

function formatDate(dateIsoString: any) {
  const dateObject = new Date(dateIsoString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const day = dateObject.getDate();

  return `${day}/${month + 1}/${year}`;
}

export const ArticleView: React.FC = () => {
  const navigate = useNavigate();
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const blogContent = useRecoilValue(blogContentState);
  //   const nostrArticles = useRecoilValue(nostrEventState);
  const [article, setArticle] = useState<any>();
  const [articleLoaded, setArticleLoaded] = useState(false);
  const relayService: RelayService = inject('relayservice');

  const getRouteSlug = () => {
    const location = useLocation();
    if (location.pathname.indexOf("article") >= 0)
      //@ts-ignore
      return /[^/]*$/.exec(location.pathname)[0];
  }

  var temp: any = null;
  const getArticle = (id: string | undefined) => {
    if (id === undefined)
      return
    
    // await ArticleService.getById(id)
    //   .then((result) => {
    //     setArticle(result);
    //     setArticleLoaded(true);
    //     return result;
    //   });
    // var result = nostrArticles.filter(articleObj => {
    //   return articleObj.id === id
    // });
    // // @ts-ignore
    // if(nostrArticles[0]) 
    //   console.log(nostrArticles[0].id)
    // temp = result;
    // relayService.sub(
    //     async (event: any) => {
    //       // this.eventSub.unsub()
    //       temp = event
    //       // this.$store.dispatch('useProfile', {
    //       //   pubkey: this.event.pubkey,
    //       //   request: true
    //       // })
    //       // this.listenAncestors()
    //     },
    //     {authors: [id], kinds: [1]/*[this.$route.params.eventId]*/},
    //   'event-browser'
    // )
    // console.log(temp);
  }

  useEffect(() => {
    if(blogContent !== '')
    {
      setArticle(blogContent);
    setArticleLoaded(true)};
  }, [blogContent])

//   getArticle(getRouteSlug())

  function something() {
    if(blogContent === '')
      navigate('/');
  }
  
  return(
      <div className="article-view">
        
            {articleLoaded &&
              <div className="article-view__container">
                { something() }
                <p className="article-view__body"><ReactMarkdown>{String(article/*.body*/)}</ReactMarkdown></p>
              </div>}
              {!articleLoaded && something()}
      </div>
  )
}
/* 
{console.log(article)}
                {/* @ts-ignore }
                <h1 className="article-view__title" style={{ color: (isDarkModeEnabled ? "white" : "black")}}>{article.title}</h1>
                {/* @ts-ignore }
                <h4 className="article-view__date">{formatDate(article.date)}</h4>
                {/* @ts-ignore }
                <h3 className="article-view__subtitle" style={{ color: (isDarkModeEnabled ? "white" : "black")}}>{article.subtitle}</h3>
                {/* @ts-ignore }
                */