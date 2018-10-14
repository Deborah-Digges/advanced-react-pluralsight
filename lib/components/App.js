import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from './SearchBar';
import Timestamp from './timeStamp';
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
    this.props.store.startClock();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.lastSubscriptionId);
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
    const searchRE = new RegExp(searchTerm, 'i');
    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRE)  || value.body.match(searchRE);
      });
    }

    return (
      <div>
        <Timestamp/>
        <SearchBar/>
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

export default App;
