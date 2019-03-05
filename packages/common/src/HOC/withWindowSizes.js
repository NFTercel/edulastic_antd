import React, { Component } from 'react';
import helpers from '../helpers';

export default function withWindowSizes(WrappedComponent) {
  return class WithWindowSizes extends Component {
    state = { windowWidth: 0, windowHeight: 0 };

    static displayName = `WithWindowSizes(${helpers.getDisplayName(WrappedComponent)})`;

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
      this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    };

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
}
