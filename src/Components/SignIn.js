import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import { database } from "../firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export default class SignIn extends React.Component {
  state = {
    userId: 0,
    username: "",
    email: ""
  }
  writeUserData = (s) => {
    const userId = s.userId + 1;
    const name = s.username;
    const email = s.email;
    const imageUrl = null;
    console.log(s);
    database.ref('users/').set({
      username: name,
      email: email, 
    });
  }
  emailHandler = (event) => {
    this.setState({
      email: event.target.value,
    })
  }
  passwordHandler = (event) => {
    this.setState({
      username: event.target.value,
        [event.target.value]:event.target.value.split(',')

    })
  }   

  render() {
  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => this.emailHandler(event)}
          />  
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="name"
            type="name"
            id="name"
            autoComplete="name"
            onChange={(event) => this.passwordHandler(event)}
            />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => this.writeUserData(this.state)
            }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={ 8}>
        <Copyright />
      </Box>
      </ThemeProvider>
      
    </Container>
  
  );          
  }
}