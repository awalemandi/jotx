import React, { useState, useContext, useEffect } from 'react';
import { insightsDocRef } from '../../firebase';
import { JotContext } from '../../Resources/JotContext';

import { CssBaseline, Grid, Divider, Typography, makeStyles, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
  textEditor: {
    maxHeight: 300,
  },
  saveButton: {
    margin: theme.spacing(2),
  },
  completeButton: {
    margin: theme.spacing(2),
  },
}));

const CurrentRead = () => {
  const { info } = useContext(JotContext);
  const [infoValue, setInfoValue] = info;
  const [alertOpen, setAlertOpen] = useState(false);

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  
  const classes = useStyles();

  const updateState = {
    title: function (e) {
      setInfoValue({
        ...infoValue,
        title: e.target.value
      })
    },

    author: function (e) {
      setInfoValue({
        ...infoValue,
        author: e.target.value
      })
    },

    commenceDate: function (e) {
      setInfoValue({
        ...infoValue,
        commenceDate: e
      })
    },

    jots: function (e, editor) {
      const data = editor.getData();
      setInfoValue({
        ...infoValue,
        jots: data
      })
    },
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const saveSuccessAlert = () => {
    console.log(`snackbar being returned ${alertOpen}`);
    console.log(alertOpen);
    return  <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity="success">
                Your progress has been saved! 👍
              </Alert>
            </Snackbar>;
    };
  
  const completeSuccessAlert = () => {
      return <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                  <Alert onClose={handleAlertClose} severity="success">
                  Wow, you finished your read! 👏
                  </Alert>
              </Snackbar>
    };
  
  const deleteWarningAlert = () => {
      return <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                  <Alert onClose={handleAlertClose} severity="warning">
                      Your progress has been saved! 👍
                  </Alert>
              </Snackbar>
    };
  
  const progressSavedAlert = () => {
    alert('Your progress has been saved! 👍');
  };

  const finishedReadAlert = () => {
    alert('Wow, you finished your read! 👏' );
  };

  const handleSave = () => {
    handleAlertOpen();
    insightsDocRef.doc()
    .set({
      insightId: `${(info[0].title+info[0].author).toLowerCase()}`,
      title: info[0].title,
      author: info[0].author,
      commenceDate: info[0].commenceDate,
      jots: info[0].jots,
      archived: false,
      completed: false
    })
    .then(() => {
      console.log(`State befoer alert: ${alertOpen}`)
      progressSavedAlert();
    })
    .catch(e => { console.log(e) });
  };

  const handleComplete = () => {
    console.log('Mark as complete function started')
    insightsDocRef.doc()
    .update({
      insightId: `${(info[0].title+info[0].author).toLowerCase()}`,
      title: info[0].title,
      author: info[0].author,
      commenceDate: info[0].commenceDate,
      jots: info[0].jots,
      archived: false,
      completed: true
    })
    .then(() => {
      setInfoValue({
        title: '',
        author: '',
        commenceDate: '01/01/2020',
        jots: 'Jots here..',
        completed: false,
        archived: false,
      });
      console.log('Mark as complete fucntion finished')
      finishedReadAlert()
    })
    .catch(e => { console.log(e) });
  };


  return (
    <>
      <CssBaseline />
      <div className={classes.paper} overflow="visible">
        <Typography component="h1" variant="h6">
          New Insight 
          <Divider />
        </Typography>
        
        <form className={classes.form} noValidate >
            <Grid container spacing={2} justify="center">
                <Grid item xs={4}>
                    <TextField
                      name="title"
                      value={info[0].title}
                      fullWidth
                      id="title"
                      label="Title"
                      autoFocus
                      onChange={updateState.title}
                    />
                </Grid>
                
                <Grid item xs={4}>
                    <TextField
                        // variant="outlined"
                        fullWidth
                        value={info[0].author}
                        id="author"
                        label="Author"
                        name="author"
                        onChange={updateState.author}
                    />
              </Grid>

              <Grid item xs={8}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    clearable
                    value={info[0].commenceDate}
                    placeholder="01/01/2020"
                    onChange={updateState.commenceDate}
                    format="dd/MM/yyyy"
                  />
              </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={8} className={classes.textEditor}>
                  <CKEditor editor={ClassicEditor}
                    data={info[0].jots}
                    onChange={updateState.jots}
                  />
                </Grid>

              <Grid item container xs={12} justify="space-around" alignItems="center">
                <Grid item xs={4}></Grid>
                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    className={classes.saveButton}
                    startIcon={<SaveRoundedIcon />}
                    onClick={handleSave}
                  >
                  
                  </Button>
                </Grid>

                <Grid item xs={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    className={classes.completeButton}
                    startIcon={<DoneAllRoundedIcon />}
                    onClick={handleComplete}
                  >
                  
                  </Button>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </Grid>

        </form>
      </div>
    </>
  );
}

export default CurrentRead;