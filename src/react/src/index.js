/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'

import { browserHistory, hashHistory } from 'react-router'

import configureStore from './redux/configureStore'

import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes/index';

// inject tap event system
injectTapEventPlugin();

const store = configureStore();

// custom histories

/*
const cusHistory = useRouterHistory(createHistory)({
  queryKey: false,
})
*/

/*
history.listen(a => {
  console.log(a);
});
*/

// ReactDOM.render(
//   <Root store={store} history={hashHistory} routes={routes()} />,
//   document.querySelector('#root')
// )


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