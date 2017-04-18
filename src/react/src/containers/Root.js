/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { RouterContext } from 'react-router';


const isNode = typeof window === 'undefined';

export default class Root extends React.Component {
  static propTypes = {
    // history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
  };

// 区分客户端和服务端
  render() {
    return isNode ? (
        <Provider store={this.props.store}>
          <RouterContext {...this.props.routeProps}>
            {this.props.routes}
          </RouterContext>
        </Provider>
    ): (
        <Provider store={this.props.store}>
            <Router history={this.props.history}>
                {this.props.routes}
            </Router>
        </Provider>
    );
  }
}

