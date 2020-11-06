import React, { useContext } from 'react';
import { JotContext} from '../../Resources/JotContext';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Paper, CssBaseline } from '@material-ui/core';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer';
import { lightTheme, darkTheme } from '../../Resources/theme';
import CurrentRead from '../ContentPages/CurrentRead';
import Library from '../ContentPages/Library';
import ToBeRead from '../ContentPages/ToBeRead';
import Statistics from '../ContentPages/Statistics';
import Bin from '../ContentPages/Bin';

import Feedback from "feeder-react-feedback"; // import Feedback component
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet

const useStyles = makeStyles((theme) => ({

root: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexGrow: 1,
  width: '100%',
  minHeight: '100vh',
  margin: theme.spacing(0),
  padding: theme.spacing(5, 0, 0, 3),
  backgroundColor: theme.palette.action.hover,
},

navigation: {
  marginRight: theme.spacing(1),
},

toolbar: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
},

content: {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '60%',
  margin: theme.spacing(5, 0, 0, 0),
  height: 'auto',
},

footer: {
  bottom: 0,
  padding: theme.spacing(1, 0, 0, 0),
  marginTop: 'auto',
  width: '100%',
  height: 'auto',
  
},

paper: {
  display: 'flex',
  padding: theme.spacing(2),
  width: '100%',
  minHeight: '6rem',
  alignItems: 'center',
  justifyContent: 'space-evenly'},
}));



function App() {
  const { content } = useContext(JotContext);
  const [contentValue, setContentValue] = content;
  const classes = useStyles();

  const displayPage = {
    currentRead: function () {
      setContentValue(<CurrentRead />)
    },
    library: function () {
      setContentValue(<Library />)
    },
    toBeRead: function () {
      setContentValue(<ToBeRead />)
    },
    statistics: function () {
      setContentValue(<Statistics />)
    },
    bin: function () {
      setContentValue(<Bin />)
    }
  }
  
  
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
        <div className={classes.root}>
          <header className={classes.navigation}>
            <Navigation page={displayPage}/>
          </header>

          <main className={classes.content}>
            <Paper elevation={3} className={classes.paper}>
              {contentValue}
            </Paper>
          </main>

          <div className={classes.toolbar} />
          <footer className={classes.footer}>
            <Paper elevation={3} className={classes.paper}>
              <Footer />
            </Paper>
          </footer>

          <Feedback
            primaryColor="#00897b"
            projectId="5f864c3404ba4d0004fb43a1"
          />
        </div>
    </ThemeProvider>
  );
}

export default App;
