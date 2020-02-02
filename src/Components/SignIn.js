import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import "firebase/auth";
import "firebase/database";
import { database } from "../firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Fuud
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
    zipCode: "",
    groceries: ""
  }
  writeUserData = (s) => {
    const zipCode = s.zipCode;
    const groceries = s.groceries;
    console.log(s);
    database.ref('orders/').push().set({
      zipCode: zipCode,
      groceries: groceries, 
    });
  }
  groceriesHandler = (event) => {
    this.setState({
      [event.target.name]:event.target.value.split(','),
      groceries: event.target.value,
    })
  }
  zipCodeHandler = (event) => {
    this.setState({
      zipCode: event.target.value,
    })
  }   

  render() {
  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Search the groceries you want!
        </Typography>

        <form className noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Groceries"
            label="Groceries"
            name="Groceries"
            autoComplete="Groceries"
            autoFocus
            onChange={(event) => this.groceriesHandler(event)}
          />  
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="zipCode"
            label="Zip Code"
            name="zipCode"
            autoComplete="zipCode"
            onChange={(event) => this.zipCodeHandler(event)}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(event) => {
              this.writeUserData(this.state); 
              event.preventDefault();
            }
            }
          >
            Search
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