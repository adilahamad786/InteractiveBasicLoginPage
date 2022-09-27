// import React, { useState, useEffect, useReducer } from 'react';
import React, { useState, useReducer, useContext } from 'react';
import AuthContext from '../Context/auth-context';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === "USER_EMAIL") {
    return { value : action.val, isValid : action.val.includes('@') };
  }
  if (action.type === "INPUT_BLUR") {
    return { value : state.value, isValid : state.value.includes('@') };
  }

  return { value : "" , isValid : null }
}

const passReducer = (state, action) => {
  if (action.type === "USER_PASS") {
    return { value : action.val, isValid : (action.val.trim().length > 6) }
  }
  if (action.type === "INPUT_BLUR") {
    return { value : state.value, isValid : (state.value.length > 6) }
  }

  return { value : "", isValid : null}
}

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispachedEmail] = useReducer(emailReducer, { value : "" , isValid : null } )
  const [passState, dispachedPass] = useReducer(passReducer, { value : "", isValid : null})

  const AuthCtx = useContext(AuthContext);

  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispachedEmail({type : "USER_EMAIL", val : event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && (passState.value.trim().length > 6)
    );
  };
  
  const validateEmailHandler = (e) => {
    dispachedEmail( {type : "INPUT_BLUR"} );
  };

  const passwordChangeHandler = (event) => {
    dispachedPass( {type : "USER_PASS", val : event.target.value} );

    setFormIsValid(
      emailState.value.includes('@') && (event.target.value.trim().length > 6)
    );
  };

  const validatePasswordHandler = (e) => {
    dispachedPass( {type : "INPUT_BLUR"} );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          label={'E-Mail'}
          type={"email"}
          id={"email"}
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          label={'Password'}
          type={"password"}
          id={"password"}
          isValid={passState.isValid}
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
