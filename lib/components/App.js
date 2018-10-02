import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickby';

class App extends React.Component {
  state = this.props.store.getState();
  static childContextTypes = {
    store: PropTypes.object
  };
  getChildContext() {
    return  {
      store: this.props.store
    };
  }

  setSearchTerm = (searchTerm) => {
    this.setState({searchTerm: searchTerm});
  }

  render() {
    let {articles, searchTerm} = this.state;

    if(searchTerm) {
      articles = pickBy(articles, (value, key) => {
        return value.title.match(searchTerm)  || value.body.match(searchTerm);
      });
    }

    return (
      <div>
        <SearchBar doSearch={this.setSearchTerm}/>
        <ArticleList
          articles={articles}
          store={this.props.store}
        />
      </div>
    );
  }
}

export default App;
