class StateApi {
  constructor(rawData) {
    this.data = {
      articles: this.mapArrayIntoObject(rawData.articles),
      authors: this.mapArrayIntoObject(rawData.authors)
    };
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
  
  getState() {
    return this.data;
  }
}

export default StateApi;
