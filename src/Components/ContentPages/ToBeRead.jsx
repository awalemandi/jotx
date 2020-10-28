import React from 'react';
import firebase from 'firebase/app';
import { userDocRef } from '../../firebase';


import { fade, makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Fab, TextField, Button, Grid, Icon, Tooltip } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import TbrList from '../TbrList';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(0, 0, 8, 2),
        padding: theme.spacing(0, 2, 0, 2),
        minHeight: 400,
    },
    root: {
        width: '100%',
    },
    button: {
        margin: theme.spacing(0,1,1,0),
    },
}));


const ToBeRead = () => {
    const classes = useStyles();
    const [input, setInput] = React.useState('');
    
    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleAddItem = item => {
        item = input;
        userDocRef
        .update({
            toBeRead: firebase.firestore.FieldValue.arrayUnion(item)
        })
        .then(() => {
            setInput('');
        })
        .catch(e => { console.log(e) });
    };


    return (
        <Grid container className={classes.paper} spacing={2} justify="center">
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Typography component="h1" variant="h6">
                    To Be Read
                        <Divider />
                </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
                <TextField
                    name="input"
                    value={input}
                    fullWidth
                    placeholder="Add a new book"
                    autoFocus
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={1}>
                <Tooltip title="Add">
                    <Fab
                    size="medium"
                    className={classes.button}
                    onClick={handleAddItem}
                    >
                        <AddRoundedIcon color="primary" />
                    </Fab>
                </Tooltip>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs ={6}>
                <TbrList/>
            </Grid>
            <Grid item xs={3}></Grid>
            
        </Grid>
    )
};

export default ToBeRead;