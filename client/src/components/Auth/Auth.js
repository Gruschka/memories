import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Paper, Grid, Typography, Container, Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { auth, signIn, signUp } from '../../actions/auth/index';
import { useHistory } from 'react-router-dom';

const initialState = { 
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){
            dispatch(signUp(formData, history))
        } else {
            dispatch(signIn(formData, history))

        }
    }

    const handleChange = (e) => {
        const { field, value } = e.target;
        setFormData({ ...formData, [field]: value })
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }
    
    const googleSuccess = async (res) => {
        dispatch(auth(res, history));
    }
    
    const googleFailure = () => {
        console.log('Google Sign In was unsuccessfull')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={ handleShowPassword }/>
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="1021588061230-07asuft73rc2hl7kog73104th31tkg33.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth variant="contained"
                                    onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>
                            Google Sign In            
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up!"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
