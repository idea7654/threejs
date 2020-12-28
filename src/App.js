import './App.css';
import React, {Component, useState} from 'react';
//import Input from './components/Input';
import Three from './components/Three';
import Main from './inc/Main';
import Moon from './inc/Moon';
import Earth from './inc/Earth';
import { useHistory, withRouter, Route } from 'react-router-dom';

const App = () => {
  const [selectedObject, setSelectedObject] = useState('');
  const history = useHistory();
  const handleSelect = (object) => {
    setSelectedObject({
      selectedObject: object
    });
    history.push(`/${object}`);
  }
  return (
    <div>
      <Three onSelect={handleSelect} selObj={selectedObject} />
        {/* <Text selObj={this.state.selectedObject} /> */}
      <Route path='/' component={Main} exact />
      <Route path='/moon' component={Moon} />
      <Route path='/earth' component={Earth} />
    </div>
  );
}

export default withRouter(App);
