import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth/index';
import { useHistory, useLocation } from 'react-router-dom';

const NavBar = () => {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;
        //JWT...
        
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const onLogout = () => {
        dispatch(logout());
        history.push('/');
        setUser(null);
    }
    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar} >
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={ onLogout }>Logout</Button>
                    </div>

                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar