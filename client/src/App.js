// import './view/App.css';
import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Search from './Search';
<<<<<<< HEAD
import GamePage from './GamePage';
import SearchResult from './SearchResult';
import Register from './Register';
import Profile from "./Profile";
import Login from "./Login";
=======
import Login from './Login';
import Register from './Register';
import GamePage from './GamePage';
import SearchResult from './SearchResult';

>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c

function App() {
    return (
        <BrowserRouter>
<<<<<<< HEAD
            <Route exact path="/" component={Search} />
            <Route path="/game" component={GamePage} />
            <Route path="/searchResult" component={SearchResult} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
=======
            {/* <Route exact path="/" component={Search} /> */}
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/" component={Register} />
            <Route path="/game" component={GamePage} />
            <Route path="/searchResult" component={SearchResult} />
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
        </BrowserRouter>
    );
}
export default App;
