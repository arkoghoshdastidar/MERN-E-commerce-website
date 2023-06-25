import styles from './LoginSignup.module.css';
import { useState, useRef } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const LoginSignup = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const nameRef = useRef();

    const formSubmitHandler = () => {
        // extracting values from the input fields
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = (isLoggingIn === false) ? confirmPasswordRef.current.value : null;
        const name = (isLoggingIn === false) ? nameRef.current.value : null;

        if (isLoggingIn) {
            // submit to login

        } else {
            // submit to signup

        }

        // clearing the input fields
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
        nameRef.current.value = "";
    }

    return (
        <div className={styles['login-signup-container']}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
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
                <Button onClick={formSubmitHandler}>{isLoggingIn?"Login":"SignUp"}</Button>
            </ButtonGroup>
        </div>
    )
}

export default LoginSignup;