import React, { Component } from "react";
import history from "../history";
import { withRouter, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dashboard from "./Dashboard";
import axios from "axios";

export class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      redirect: false
    };
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onisLoggedIn = () => {
    this.setState({ redirect: true });
  };

  onSubmit = event => {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    if (email === "admin" && password === "admin") {
      axios
        .post(
          `https://ec2-52-66-213-31.ap-south-1.compute.amazonaws.com:7452/cmVzdGZ1bCBhcGk/cmlybyBsb3JhIHByb3h5IHNlcnZlciA/signin`,
          {
            id: "5d5ec20aedc3268530f1659c",
            u: "$2b$07$FSxd3aDsh1eBTvQxJhfTLOJL3tqdCSSEJLM4KVTXb3sz/K8sVXUXq"
          },
          {
            Headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
              "Content-Type": "Appliction/json"
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            sessionStorage.setItem("token", res.data.token);
            console.log("token", sessionStorage.getItem("token"));
            console.log(res.data);
            console.log(this.state.redirect);
            if (this.onisLoggedIn) {
              history.push("/Dashboard");
              return <Route exact path="/Dashboard" component={Dashboard} />;
            }
          } else {
            const error = new Error(res.error);
            throw error;
          }
        });
    } else {
      console.log("Invalid credentials");
    }
  };

  render() {
    const useStyles = makeStyles(theme => ({
      "@global": {
        body: {
          backgroundColor: theme.palette.common.white
        }
      },
      paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        alignItems: "middle"
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
      },
      submit: {
        margin: theme.spacing(3, 0, 2)
      }
    }));

    const { errors } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component="h1" variant="h5">
            Water Meter Monitoring
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.onSubmit} className={useStyles.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={errors.email}
              onChange={this.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password}
              onChange={this.onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={useStyles.submit}
                onClick={this.onSubmit}
              >
                Sign In
              </Button>
            </Link>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(SignIn);
