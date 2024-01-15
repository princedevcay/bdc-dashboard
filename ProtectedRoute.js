// ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from './src/cookieUtils';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getCookie('authToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default ProtectedRoute;
