import ArticleList from './ArticleList';
import DataApi from 'state-api';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    articles: {},
    authors: {}
  };

  async componentDidMount() {
    const response = await axios.get('/data');
    const api  = new DataApi(response.data);
    this.setState({
      articles: api.getArticles(),
      authors: api.getAuthors()
    });
  }

  articleActions = {
    lookupAuthor: (authorId) => this.state.authors[authorId],
  };

  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        articleActions={this.articleActions}
      />
    );
  }
}

export default App;
