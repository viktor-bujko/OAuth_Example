import React, {useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleIcon from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { handleGoogleOAuthSignIn } from "../google_oauth/oauth";

const LoginForm = () => {

  const [state, setState] = useState({ checked: false })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  }

  const handleCheckboxSet = (oldValue: boolean) => {
    console.log(`Old checkbox value: ${oldValue}; setting to ${!oldValue}`);

    setState({ ...state, checked: !oldValue});
    console.log(`Current checkbox value: ${state.checked}`)
  } 

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal" 
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checked} value="remember" color="primary" />}
        label="Remember me"
        onChange={() => handleCheckboxSet(state.checked)}
      />
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => alert("MOCK => Logged In")}
      >
        Sign In
      </Button>
      <Button
        fullWidth
        startIcon={<GoogleIcon />}
        variant="contained"
        sx={{ mt: 0, mb: 2 }}
        onClick={handleGoogleOAuthSignIn}
      >
        Sign In Using Google Account
      </Button>
      <div className="g-signin2" ></div>
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
    </Box>
  )
}

export default LoginForm;