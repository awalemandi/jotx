import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {CssBaseline, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, InputBase,} from '@material-ui/core';
import clsx from 'clsx';

import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import FiberNewRoundedIcon from '@material-ui/icons/FiberNewRounded';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import LayersRoundedIcon from '@material-ui/icons/LayersRounded';
import InsertChartRoundedIcon from '@material-ui/icons/InsertChartRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Brightness6RoundedIcon from '@material-ui/icons/Brightness6Rounded';
import FeedbackRoundedIcon from '@material-ui/icons/FeedbackRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import logo from './Jotit-logo-small.png';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
     root: {
        display: 'flex',
        flexGrow: 1,
    },
    
    appBar: {
        maxHeight: 60,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    
    icon: {
        display: 'block',
        margin: theme.spacing(2),
    },
    
    logo: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
        height: 'auto',
        width: 'auto',
        maxHeight: 200,
        maxWidth: 400,
    },
    
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.45),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    },
  
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    inputRoot: {
        color: 'inherit',
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1.5em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '60ch',
        },
    },

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },

    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
    
    hide: {
    display: 'none',
    },
    
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },

    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
     
    drawerClose: {
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
        },
    },
    
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const Navigation = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerState = () => {
    (open) ? setOpen(false) : setOpen(true);
  };
  return (
    <div>
     <CssBaseline />
        <AppBar
        position="fixed"
        className={clsx(classes.appBar)}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerState}
                    edge="start"
                    className={clsx(classes.icon)}
                >
                    <MenuIcon />
                </IconButton>
                  
                <div className={classes.logo}>
                    <img className={classes.logo} src={logo} alt="logo"/>
                </div>
                  
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>

                    <InputBase
                    placeholder="Search…"
                    classes={{
                         root: classes.inputRoot,
                         input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                  
                <div className={classes.icon}>
                    <IconButton>
                        <LiveHelpIcon/>
                    </IconButton>
                </div>
                
                <div className={classes.icon}>
                    <IconButton>
                        <Brightness6RoundedIcon />
                    </IconButton>
                </div>
                  
                <div className={classes.icon}>
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                </div>

            </Toolbar>
        </AppBar>
          
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
            }}
        >
            <div className={classes.toolbar}/>
         
            <List>
                  
                <ListItem button>
                    <ListItemIcon>
                        <FiberNewRoundedIcon/>
                    </ListItemIcon>
                        <ListItemText primary="Current Read" />
                </ListItem>
              
                <ListItem button>
                    <ListItemIcon>
                        <LayersRoundedIcon/>
                    </ListItemIcon>
                        <ListItemText primary="Library" />
                 </ListItem>
          
                <ListItem button>
                    <ListItemIcon>
                        <StoreRoundedIcon/>
                    </ListItemIcon>
                        <ListItemText primary="To Be Read" />
                </ListItem>
                    
                <ListItem button>
                    <ListItemIcon>
                        <InsertChartRoundedIcon/>
                    </ListItemIcon>
                        <ListItemText primary="Statistics" />
                </ListItem>  
            
            </List>
              
            <Divider />
                  
            <List>
                  
                <ListItem button>
                    <ListItemIcon>
                        <FeedbackRoundedIcon/>
                    </ListItemIcon>
                        <ListItemText primary="Feedback" />
                </ListItem>
              
                <ListItem button>
                    <ListItemIcon>
                        <DeleteRoundedIcon/>
                    </ListItemIcon>
                        <ListItemText primary="Bin" />
                </ListItem>
                    
            </List>
              
        </Drawer>
    </div>
  );
}

export default Navigation;