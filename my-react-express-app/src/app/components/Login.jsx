import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

export const LoginComponent = ({authenticateUser, authenticated}) => {
    return <div>
        <h2>
           Please Login ! 
        </h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="name" name="username" defaultValue="Dev"></input>
            <input type="password" placeholder="password" name="password" defaultValue=""></input>
            {authenticated === mutations.NOT_AUTHENTICATED ? <p> Login Incorrect </p> : '' }
            <button type="submit">Login</button>
        </form>
    </div>
}

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUser(e) {
        e.preventDefault();
        let username = e.target['username'].value;
        let password = e.target['password'].value;
        dispatch(mutations.requestAuthenticatedUser(username, password));
    }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

