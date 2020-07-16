import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

const Navigation = () => (
    <div>
        <Link to="/dashboard">
            My Application
        </Link>
    </div>
);

export const ConnectedNavigation = connect(state=>state) (Navigation);

