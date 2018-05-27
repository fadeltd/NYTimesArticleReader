import strings from '../strings';

describe('To Title Case', () => {
  it('should return the string of By The Associated Press)', () => {
    expect(strings.toTitleCase('By THE ASSOCIATED PRESS')).toMatchSnapshot();
  });

  it('should return the string of By Reuters)', () => {
    expect(strings.toTitleCase('By REUTERS')).toMatchSnapshot();
  });

  it('should return null', () => {
    expect(strings.toTitleCase('')).toMatchSnapshot();
  });
});

describe('Get Params', () => {
  it('should return the string of https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3304a9018a9a4cd8a6c587cd2060e092&page=0&sort=newest&q=Brazil&', () => {
    expect(strings.getParams('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      'api-key': '3304a9018a9a4cd8a6c587cd2060e092',
      'page': 0,
      'sort': 'newest',
      'q': 'Brazil'
    })).toMatchSnapshot();
  });

  it('should return the string of https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3304a9018a9a4cd8a6c587cd2060e092&page=0&sort=oldest&', () => {
    expect(strings.getParams('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      'api-key': '3304a9018a9a4cd8a6c587cd2060e092',
      'page': 0,
      'sort': 'oldest',
    })).toMatchSnapshot();
  });

  it('should return null', () => {
    expect(strings.getParams('', {})).toMatchSnapshot();
  });
});