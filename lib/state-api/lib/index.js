class DataApi {
  constructor(rawData) {
    this.rawData = rawData;
  }

  mapArrayIntoObject(arr) {
    return arr.reduce((acc, element) => {
      acc[element.id] = element;
      return acc;
    }, {});
  }

  getArticles() {
    return this.mapArrayIntoObject(this.rawData.articles);
  }

  getAuthors() {
    return this.mapArrayIntoObject(this.rawData.authors);
  }
}

export default DataApi;
