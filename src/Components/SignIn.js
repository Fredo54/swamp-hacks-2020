import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import "firebase/auth";
import "firebase/database";
import { database } from "../firebase";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    groceries: "",
    open: false,
    toggleSearch: true,
    fruit: [],
    Restaurants: [],
    prices: [],
    toggleTable: false
  }
  writeUserData = (s, foodObject) => {
    const zipCode = s.zipCode;
    const groceries = s.groceries;
    console.log(s);
    this.setState({toggleSearch: false});

    database.ref('orders/').push().set({
      zipCode: zipCode,
      groceries: groceries, 
    }).then( () => {
      let foodData = database.ref('32816/');

      foodData.on('value', (snapshot, foodObject) => {
        snapshot.forEach((childSnapshot) => {

          let key = childSnapshot.key;
          let childData = childSnapshot.val();


          this.setState({fruit:[...this.state.fruit, key]});

          childSnapshot.forEach((childChild) => {
            let key = childChild.key;
            let childData = childChild.val();


            this.setState({Restaurants:[...this.state.Restaurants, key]});

            childChild.forEach((child3rd) => {
              let key = child3rd.key;
              let child3rdData = child3rd.val();
              this.setState({prices:[...this.state.prices, child3rdData]});
              console.log(this.state);
            })
          })
        })

      })
    }).then(() => {
      console.log(this.state);
      this.setState({toggleTable: !this.state.toggleTable});

        })
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
  toggleModalHandler = (event) => {
    this.setState({
      open: !event.open
    })
  }  

  render() {
    const open = this.state.open;
    let tutorial;
    let loader;
    let search;
    let table;
    if(open) {
       tutorial = <div>
      <div style={{textAlign:'left'}}>
      <li>Key in your foods</li>
      <li>Separate by a comma</li>
      <li>Sit back and relax!</li>
      </div>
    </div>
    }
    if(this.state.toggleTable) {
      table = 
        <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align="right">{this.state.Restaurants[0]}</TableCell>
            <TableCell align="right">{this.state.Restaurants[1]}</TableCell>
            <TableCell align="right">{this.state.Restaurants[2]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row"> {this.state.fruit[0]} </TableCell>
              <TableCell align="right">{this.state.prices[0]}</TableCell>
              <TableCell align="right">{this.state.prices[1]}</TableCell>
              <TableCell align="right">{this.state.prices[2]}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    }
    if(this.state.toggleSearch){
      search = <div>
      <Typography component="h1" variant="h5">
        Fuud searches grocery sites
      </Typography>
      <Typography component="h1" variant="h5">
        Fuud saves you time
      </Typography>
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
            this.writeUserData(this.state, null); 
            event.preventDefault();
          }
          }
        >
          Search!
        </Button>
        <Box paddingTop={5}>
          <Button 
            variant="contained"
            color="primary" 
            style={{padding:'100'}}
            onClick={() => {this.toggleModalHandler(this.state)}}
            >
            How to use?
          </Button>
          {tutorial}
        </Box>

      </form>
    </div>
    }
  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      {search}
      {table}
      <Box mt={8}>
        <Copyright />
      </Box>
      </ThemeProvider>
      
    </Container>
  
  );          
  }
}