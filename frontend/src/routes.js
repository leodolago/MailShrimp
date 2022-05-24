import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom';

import SignIn from './pages/public/SignIn/index'
import SignUp from './pages/public/SignUp/index'
import Dashboard from './pages/secure/Dashboard';

function Home() {
    return (
        <div>
            <h2>Inicio</h2>
        </div>
    )
}

export default function routes() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}