import ArticleList from './ArticleList';
import DataApi from '../DataApi';
import React from 'react';
import {data} from '../testData';

const api  = new DataApi(data);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: api.getArticles(),
      authors: api.getAuthors()
    };
  }

  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        authors={this.state.authors}
      />
    );
  }
}

export default App;
