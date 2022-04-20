// import './view/App.css';
import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Search from './Search';


function App() {
  return (
      <BrowserRouter>
          <Route exact path="/" component={Search} />
      </BrowserRouter>
  );
}
export default App;
