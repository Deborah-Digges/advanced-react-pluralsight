import React from 'react';

class Timestamp extends React.Component {
  render() {
    return (
      <div>
        {this.props.timestamp.toDateString()}
      </div>
    );
  }
}

export default Timestamp;
