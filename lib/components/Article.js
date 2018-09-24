import React from 'react';
import PropTypes from 'prop-types';

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

const Article = (props, context) => {
  const {article} = props;
  const author = context.store.lookupAuthor(article.authorId);
  return (
    <div style={styles.article}>
      <div style={styles.title}>{article.title}</div>
      <div style={styles.date}>
        {dateDisplay(article.date)}
      </div>
      <div style={styles.author}>
        <a ref={article.website}>
          {author.firstName} {author.lastName}
        </a>
      </div>
      <div style={styles.body}>{article.body}</div>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    website: PropTypes.string,
    body: PropTypes.string.isRequired
  })
};

Article.contextTypes = {
  store: PropTypes.object
};

export default Article;
