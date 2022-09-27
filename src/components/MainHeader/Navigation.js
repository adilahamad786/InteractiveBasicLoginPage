import React, {useContext} from 'react';

import AuthContext from '../Context/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {

  const AuthState = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {AuthState.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {AuthState.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {AuthState.isLoggedIn && (
          <li>
            <button onClick={AuthState.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
