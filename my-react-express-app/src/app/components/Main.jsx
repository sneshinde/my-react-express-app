import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store'
import { ConnectedDashboard } from './Dashboard';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import { history } from '.././store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';
import { ConnectedLogin } from './Login';
//import { Redirect } from 'react-router';

const RouteGuard = Component => ({match})=> {
    console.info("RouteGuard, ", RouteGuard );
    if(!store.getState().session.authenticated){
        return <Redirect to="/"/>
    } else {
        return <Component match={match}></Component>
    }
};
export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation/>
                {/* <ConnectedDashboard/> */}
                <Route exact path="/" component={ConnectedLogin} />
                <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
                <Route exact path="/taskDetail/:id" render={RouteGuard(ConnectedTaskDetail)} />
            </div>
        </Provider>
    </Router>
)