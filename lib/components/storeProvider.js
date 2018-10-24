import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = () => ({})) => (Component) => {
  return class extends React.PureComponent {
    static displayName = `${Component.name}Container`;

    usedState = () => {
      return extraProps(this.context.store, this.props);
    }
    
    state = this.usedState();

    onStoreChange = () => {
      if (this.lastSubscriptionId) {
        this.setState(this.usedState());
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
      return <Component {...this.usedState()}
        {...this.props}
        store={this.context.store}/>;
    }

  };
};

export default storeProvider;
