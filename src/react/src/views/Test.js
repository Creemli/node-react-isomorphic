/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';

@connect((state) => ({
  data: state.data
}), () => {
  return {};
})

class Test extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  goTo() {
    this.context.router.push('hello')
  }

  render() {
    return (<div className="test" onTouchTap={::this.goTo}>Hello World!
      <div className="styleCore">大ddddd</div>
    </div>);
  }

  componentDidMount() {
  }
}

export default Test;


