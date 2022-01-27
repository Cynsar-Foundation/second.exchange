const ArticleService = {
  articles: [
    {
      id: 1,
      date: '2020-07-01T07:48:38.910Z',
      title: 'Amazing blog post',
      subtitle: 'A really fancy subtitle to catch your attention',
      body: [
        'Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my exercise so in. Procured shutters mr it feelings. To or three offer house begin taken am at. As dissuade cheerful overcame so of friendly he indulged unpacked. Alteration connection to so as collecting me. Difficult in delivered extensive at direction allowance. Alteration put use diminution can considered sentiments interested discretion. An seeing feebly stairs am branch income me unable. ',
        'Repulsive questions contented him few extensive supported. Of remarkably thoroughly he appearance in. Supposing tolerably applauded or of be. Suffering unfeeling so objection agreeable allowance me of. Ask within entire season common far who family. As be valley warmth assure on. Park girl they rich hour new well way you. Face ye be me been room we sons fond. ',
        'He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing...',
      ],
      statistics: {
        likes: 42,
        dislikes: 4,
      },
    },
    {
      id: 2,
      date: '2020-06-25T09:35:38.910Z',
      title: 'Not so amazing post',
      subtitle: 'A decent subtitle',
      body: [
        'Months on ye at by esteem desire warmth former. Sure that that way gave any fond now. His boy middleton sir nor engrossed affection excellent. Dissimilar compliment cultivated preference eat sufficient may. Well next door soon we mr he four. Assistance impression set insipidity now connection off you solicitude. Under as seems we me stuff those style at. Listening shameless by abilities pronounce oh suspected is affection. Next it draw in draw much bred.',
        'Smallest directly families surprise honoured am an. Speaking replying mistress him numerous she returned feelings may day. Evening way luckily son exposed get general greatly. Zealously prevailed be arranging do. Set arranging too dejection september happiness. Understood instrument or do connection no appearance do invitation. Dried quick round it or order. Add past see west felt did any. Say out noise you taste merry plate you share. My resolve arrived is we chamber be removal.',
        'Sudden she seeing garret far regard. By hardly it direct if pretty up regret. Ability thought enquire settled prudent you sir. Or easy knew sold on well come year...',
      ],
      statistics: {
        likes: 18,
        dislikes: 12,
      },
    },
    {
      id: 3,
      date: '2020-06-09T10:05:38.910Z',
      title: 'A bad post',
      subtitle: 'And the subtitle is bad too',
      body: [
        'Residence certainly elsewhere something she preferred cordially law. Age his surprise formerly mrs perceive few stanhill moderate. Of in power match on truth worse voice would. Large an it sense shall an match learn. By expect it result silent in formal of. Ask eat questions abilities described elsewhere assurance. Appetite in unlocked advanced breeding position concerns as. Cheerful get shutters yet for repeated screened. An no am cause hopes at three. Prevent behaved fertile he is mistake on.',
        'In no impression assistance contrasted. Manners she wishing justice hastily new anxious. At discovery discourse departure objection we. Few extensive add delighted tolerably sincerity her. Law ought him least enjoy decay one quick court. Expect warmly its tended garden him esteem had remove off. Effects dearest staying now sixteen nor improve.',
        'Mind what no by kept. Celebrated no he decisively thoroughly. Our asked...',
      ],
      statistics: {
        likes: 7,
        dislikes: 19,
      },
    },
  ],

  getAll() {
    // Simulate backend call by resolving the Promise after 500ms
    return new Promise(resolve => {
      setTimeout(() => resolve(this.articles), 500);
    });
  },

  getById(id: number) {
    // Simulate backend call by resolving the Promise after 500ms
    return new Promise(resolve => {
      setTimeout(() => resolve(this.articles.find(article => article.id === id)), 500);
    });
  },
};

export default ArticleService;
