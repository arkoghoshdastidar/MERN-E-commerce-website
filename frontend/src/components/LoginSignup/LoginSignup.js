import styles from './LoginSignup.module.css';
import { useState, useRef } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { login, clearError, signup } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';

const LoginSignup = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const nameRef = useRef();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isAuthenticated, loading } = useSelector(state => state.user);

    const formSubmitHandler = () => {
        // extracting values from the input fields
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = (isLoggingIn === false) ? confirmPasswordRef.current.value : null;
        const name = (isLoggingIn === false) ? nameRef.current.value : null;

        if (isLoggingIn) {
            // submit to login
            dispatch(login(email, password));
        } else {
            // submit to signup
            if (password === confirmPassword) {
                dispatch(signup(name, email, password));
            } else {
                alert.show('Password and confirm passwor do not match.');
            }
        }

        // clearing the input fields
        emailRef.current.value = "";
        passwordRef.current.value = "";
        if (isLoggingIn === false) {
            confirmPasswordRef.current.value = "";
            nameRef.current.value = "";
        }
    }

    if (error) {
        alert.show(error);
        dispatch(clearError());
    }

    return (
        <div className={styles['login-signup-container']}>
            {loading ? <Loader /> : <><ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => setIsLoggingIn(true)}>Login</Button>
                <Button onClick={() => setIsLoggingIn(false)}>SignUp</Button>
            </ButtonGroup>
                <form>
                    {!isLoggingIn && <div>
                        <label>Name</label>
                        <input ref={nameRef} type="text" name="name" placeholder="example" />
                    </div>}
                    <div>
                        <label>Email</label>
                        <input ref={emailRef} type="email" name="email" placeholder="example@example.com" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input ref={passwordRef} type="password" name="password" placeholder='password' />
                    </div>
                    {!isLoggingIn && <div>
                        <label>Confirm Password</label>
                        <input ref={confirmPasswordRef} type="password" name="confirm_password" placeholder='confirm password' />
                    </div>}
                </form>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={formSubmitHandler}>{isLoggingIn ? "Login" : "SignUp"}</Button>
                </ButtonGroup></>}
        </div>
    )
}

export default LoginSignup;