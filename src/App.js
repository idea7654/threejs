import './App.css';
import React, {Component} from 'react';
//import Input from './components/Input';
import Three from './components/Three';
import Main from './inc/Main';
import Moon from './inc/Moon';
import Earth from './inc/Earth';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component{
  state = {
    selectedObject: null
  }
  handleSelect = (object) => {
    this.setState({
      selectedObject: object
    });
    console.log(object);
  };
  render(){
    return (
      <div>
        <Three onSelect={this.handleSelect} />
        {/* <Text selObj={this.state.selectedObject} /> */}
        <BrowserRouter>
          <Route path='/' component={Main} exact />
          <Route path='/moon' component={Moon} />
          <Route path='/earth' component={Earth} />
        </BrowserRouter>
      </div> 
    )
  }
}

export default App;
