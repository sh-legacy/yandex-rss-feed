import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import './assets/scss/App.scss';

import { FeedsStore } from "./store";
const feedsStore = new FeedsStore();

ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route path="/" render={props => {
                    return <FeedPage {...props} feedsStore={ feedsStore }/>
                }}/>
            </Switch>
        </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
