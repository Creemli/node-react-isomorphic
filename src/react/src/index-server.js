/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */
import React, {Component} from 'react'
import Root from './containers/Root'

import configureStore from './redux/configureStore'


import routes from './routes/index';


const store = configureStore();

export default class App extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    render() {
        return <Root routeProps={this.props.routeProps} store={store} routes={routes()} />;
    }
}