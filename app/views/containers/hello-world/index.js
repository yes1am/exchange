import React, { Component } from 'react'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

import { Toast } from 'antd-mobile'

class HelloWorld extends Component {
  componentDidMount () {
    this.hello()
  }
  hello = () => {
    console.log(123)
  };
  render = () => {
    return (
      <React.Fragment>
        <div className='title'>
            Hello, express-react-dev-template
        </div>
        <div onClick={() => Toast.info('123123')}>
          toast
        </div>
        {/* <Icon type='android' /> */}
      </React.Fragment>
    )
  }
}

export default HelloWorld
