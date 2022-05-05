// import './view/App.css';
import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Search from './Search';

import GamePage from './GamePage';
import SearchResult from './SearchResult';
import Register from './Register';
import Profile from "./Profile";
import Login from "./Login";






function App() {
    return (
        <BrowserRouter>

            <Route exact path="/" component={Search} />
            <Route path="/game" component={GamePage} />
            <Route path="/searchResult" component={SearchResult} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />

            {/* <Route exact path="/" component={Search} /> */}
            {/* <Route exact path="/" component={Login} /> */}

        </BrowserRouter >
    );
}

export default App;
