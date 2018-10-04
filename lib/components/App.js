import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickby';

class App extends React.Component {
  state = this.props.store.getState();
  // we need to get the updated state when the store changes
  // we need to subscribe to changes in the store Object
  // Provide the store object a callback to be executed everytime it changes it's data
  onStoreChange = () => {
    this.setState(this.props.store.getState());
  };

  componentDidMount() {
    this.lastSubscriptionId = this.props.store.subscribe(this.onStoreChange);
  }

  componentWillUnmount() {
    this.props.state.unsubscribe(this.lastSubscriptionId);
  }

  static childContextTypes = {
    store: PropTypes.object
  };
  getChildContext() {
    return  {
      store: this.props.store
    };
  }

  render() {
    let {articles, searchTerm} = this.state;

    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchTerm)  || value.body.match(searchTerm);
      });
    }

    return (
      <div>
        <SearchBar doSearch={this.props.store.setSearchTerm}/>
        <ArticleList
          articles={articles}
          store={this.props.store}
        />
      </div>
    );
  }
}

export default App;
