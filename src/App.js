import './App.css';
import React, {Component} from 'react';
//import Input from './components/Input';
import Three from './components/Three';
import Text from './components/Text';

class App extends Component{
  render(){
    return (
      <div>
        <Three />
        <Text />
      </div> 
    )
  }
}

export default App;
