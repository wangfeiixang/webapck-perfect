

import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css';//导入

class Greeter extends Component{
  render() {
    return (
      <div className={styles.root} >
        {config.greetText}2222
        <p onClick={this.alert.bind(this)}>3999</p>
      </div>
    );
  }

	alert(){
		console.log('热加载',this)
	}
  	
}

export default Greeter


