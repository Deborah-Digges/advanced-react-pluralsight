import React from 'react';

const styles = {
  article: {
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1
  },
  title: {
    fontWeight: 'bold'
  },
  date: {
    fontSize: '0.85em',
    color: '#888'
  },
  author: {
    paddingBottom: 10,
    paddingTop: 10
  },
  body: {
    paddingLeft: 20
  }

};
const dateDisplay = (dateString) => new Date(dateString).toDateString();

const Article = (props) => {
  const {article, author} = props;
  return (
    <div style={styles.article}>
      <div style={styles.title}>{article.title}</div>
      <div style={styles.date}>
        {dateDisplay(article.date)}
      </div>
      <div style={styles.author}>
        <a h  ref={article.website}>
          {author.firstName} {author.lastName}
        </a>
      </div>
      <div style={styles.body}>{article.body}</div>
    </div>
  );
};

export default Article;
