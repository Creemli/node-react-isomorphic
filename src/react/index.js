/**
 * Created by lixiaoxi on 2017/3/9.
 * @description
 */


import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore'
import ViewPage from './view';
import Root from './src/containers/Root';
import routes from './src/routes';
import Hello from './src/views/Hello'


const store = configureStore();

class TestPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        // return (<Root store={store} routes={routes()} />);
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }

}


export default TestPage;