import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {AppContainer} from './container/index'
import {connect} from './db/connect'

const App = () =>  {
  useEffect(() => { 
    const runIndexDb = async () => {
      await connect();
    }
    runIndexDb()
  },[])
  return (
    <div className="App">
        <AppContainer/> 
     </div>
  );
}

export default App;
