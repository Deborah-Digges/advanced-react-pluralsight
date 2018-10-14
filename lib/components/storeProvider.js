import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = () => ({})) => (Component) => {
  return class extends React.PureComponent {
    static displayName = `${Component.name}Container`;

    onStoreChange = () => {
      if (this.lastSubscriptionId) {
        this.forceUpdate();
      }
    };

    componentDidMount() {
      this.lastSubscriptionId = this.context.store.subscribe(this.onStoreChange);
    }

    componentWillUnmount() {
      this.context.store.unsubscribe(this.lastSubscriptionId);
      this.lastSubscriptionId = null;
    }
    static contextTypes = {
      store: PropTypes.object
    };

    render() {
      return <Component {...extraProps(this.context.store, this.props)}
        {...this.props}
        store={this.context.store}/>;
    }

  };
};

export default storeProvider;
