class StateApi {
  constructor(rawData) {
    this.data = {
      articles: this.mapArrayIntoObject(rawData.articles),
      authors: this.mapArrayIntoObject(rawData.authors),
      searchTerm: '',
      timestamp: new Date(),
    };

    this.subscriptions = {};
    this.lastSubscriptionId = 0;

    setTimeout(() => {
      const fakeArticle = {
        ...rawData.articles[0],
        id: 'fakeArticleId'
      };
      this.data  = {
        ...this.data,
        articles: {
          ...this.data.articles,
          [fakeArticle.id]: fakeArticle
        }
      };
      this.notifySubscribers();
    }, 1000);
  }

  mapArrayIntoObject(arr) {
    return arr.reduce((acc, element) => {
      acc[element.id] = element;
      return acc;
    }, {});
  }

  lookupAuthor = (authorId) => {
    return this.data.authors[authorId];
  };

  subscribe = (callback) => {
    this.lastSubscriptionId += 1;
    this.subscriptions[this.lastSubscriptionId] = callback;
    return this.lastSubscriptionId;
  };

  unsubscribe = (lastSubscriptionId) => {
    delete this.subscriptions[lastSubscriptionId];
  };

  getState() {
    return this.data;
  }

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb) => cb());
  };

  mergeWithState = (stateChange) => {
    this.data = {
      ...this.data,
      ...stateChange
    };
    this.notifySubscribers();
  };
  setSearchTerm = (searchTerm) => {
    this.mergeWithState({
      searchTerm,
    });
  }

  startClock = () => {
    setInterval(() => {
      this.mergeWithState({
        timestamp: new Date(),
      });
    }, 1000);
  }
}

export default StateApi;
