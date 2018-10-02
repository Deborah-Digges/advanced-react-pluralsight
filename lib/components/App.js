import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from './SearchBar';

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
    return (
      <div>
        <SearchBar doSearch={this.setSearchTerm}/>
        <ArticleList
          articles={this.state.articles}
          store={this.props.store}
        />
      </div>
    );
  }
}

export default App;
