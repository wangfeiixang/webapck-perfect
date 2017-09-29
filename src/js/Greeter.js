

import React, {Component} from 'react';
import config from '../config.json';
import '../css/Greeter.css';//导入

class Greeter extends Component{
  render() {
  	let style = {width:'100px', height:'100px'}
    return (
      <div className="root">
        {config.greetText}2222
        <p onClick={this.alert.bind(this)} className="img">222999</p>
        <img style={style}  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506683242275&di=8f3b6571b3e6f35f008ca42dad6726a0&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F68%2F96%2F68x58PICrws_1024.jpg" />
        <img style={style}  src="../img/search.jpg" />
        <p id="img"></p>
      </div>
    );
  }

	alert(){
		console.log('热加载',this)
	}
  	
}

export default Greeter


