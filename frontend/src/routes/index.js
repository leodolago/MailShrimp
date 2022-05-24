import React from "react";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignInPage from '../pages/public/SignIn'
import SignUpPage from '../pages/public/SignUp'

import DashboardPage from '../pages/secure/Dashboard';
import ContactsListPage from '../pages/secure/ContactsList';
import ContactAddPage from '../pages/secure/ContactAdd';
import ContactDetailsPage from '../pages/secure/ContactDetails'

import RoutePrivate from './router-Wrapper'

export default function Routes() {
    return (
        <Router>
            <Switch>
                <RoutePrivate exact path="/" component={DashboardPage} />
                <RoutePrivate exact path="/contacts" component={ContactsListPage} />
                <RoutePrivate exact path="/contacts/add" component={ContactAddPage} />
                <RoutePrivate exact path="/contacts/:id" component={ContactDetailsPage} />
                <Route exact path="/signin" component={SignInPage} />
                <Route exact path="/signup" component={SignUpPage} />
            </Switch>
        </Router>
    )
}