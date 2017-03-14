/**
 * Created by lixiaoxi on 2017/3/9.
 * @description
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDetail, changeName } from '../redux/modules/productDetail';

@connect(
    (state) => {
        console.log(state, '-----');
        return {name: state.productDetail.name};
    },
    (dispatch) => bindActionCreators({
        getDetail
    }, dispatch))
class ViewPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this.props.getDetail();
    }



    render() {
        const { name, children } = this.props;
        return (
            <div class="another-page">AnotherPage  {name}
                {children}
            </div>
        );
    }
}

export default ViewPage;