import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import { getPosts } from '../../actions/posts';

const Home = () => {
    const dispatch = useDispatch();
    const currentId = useSelector((state) => state.posts.currentId);
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])
    return (
    <Grow in>
        <Container>
            <Grid className={classes.mainContainer} container justify="space-between" align-items="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form />
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home
