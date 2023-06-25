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

    const formSubmitHandler = () => {
        // extracting values from the input fields
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = (isLoggingIn === false) ? confirmPasswordRef.current.value : null;

        // clearing the input fields
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
    }

    return (
        <div className={styles['login-signup-container']}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => setIsLoggingIn(true)}>Login</Button>
                <Button onClick={() => setIsLoggingIn(false)}>SignUp</Button>
            </ButtonGroup>
            <form>
                <div>
                    <label>Email : </label>
                    <input ref={emailRef} type="email" name="email" placeholder="example@example.com" />
                </div>
                <div>
                    <label>Password : </label>
                    <input ref={passwordRef} type="password" name="password" placeholder='password' />
                </div>
                {!isLoggingIn && <div>
                    <label>Confirm Password : </label>
                    <input ref={confirmPasswordRef} type="password" name="confirm_password" placeholder='confirm password' />
                </div>}
            </form>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={formSubmitHandler}>Submit</Button>
            </ButtonGroup>
        </div>
    )
}

export default LoginSignup;