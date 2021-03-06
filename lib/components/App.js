import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import React from 'react';
import SearchBar from './SearchBar';
import Timestamp from './timeStamp';
import pickBy from 'lodash.pickby';
import Perf from 'react-addons-perf';

if(typeof window !== 'undefined') {
  window.Perf = Perf;
}

class App extends React.PureComponent {
  appState = () => {
    const {articles, searchTerm} = this.props.store.getState();
    return {articles, searchTerm};
  };

  state = this.appState();
  // we need to get the updated state when the store changes
  // we need to subscribe to changes in the store Object
  // Provide the store object a callback to be executed everytime it changes it's data
  onStoreChange = () => {
    this.setState(this.appState());
  };

  componentDidMount() {
    this.lastSubscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
    setImmediate(() => {
      Perf.start();
    });

    setTimeout(() => {
      Perf.stop();
      Perf.printWasted();
    }, 5000);
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
