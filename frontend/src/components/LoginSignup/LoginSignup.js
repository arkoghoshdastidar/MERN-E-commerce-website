import styles from './LoginSignup.module.css';
import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const LoginSignup = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    return (
        <div className={styles['login-signup-container']}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>Login</Button>
                <Button>SignUp</Button>
            </ButtonGroup>
            <form>
                <div>
                    <label>Email : </label>
                    <input type="email" name="email" placeholder="example@example.com" />
                </div>
                <div>
                    <label>Password : </label>
                    <input type="text" name="password" placeholder='password' />
                </div>
                <div>
                    <label>Confirm Password : </label>
                    <input type="text" name="confirm_password" placeholder='confirm password' />
                </div>
            </form>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>Submit</Button>
            </ButtonGroup>
        </div>
    )
}

export default LoginSignup;