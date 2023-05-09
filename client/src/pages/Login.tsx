import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActionCreators from "../state/actions/action-creator/authActions";
import { useSelector } from 'react-redux';
import { StateType } from '../state/reducers';
import axios from 'axios';
import { useNavigate, Link as LinkRouterDom } from 'react-router-dom'
import EtudiantPage from './EtudiantPage';

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


const SignInSide = () => {
    const dispatch = useDispatch();
    const { handleLoginFormOnChange, authLogIn, resetLoginForm } = bindActionCreators(authActionCreators, dispatch);
    const authState = useSelector((state: StateType) => state.authReducer);

    // Pour savoir si c'est un loginForm ou signup form
    const [loginForm, setLoginForm] = useState(true);

    const switchLoginForm = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        setLoginForm(!loginForm);
        resetLoginForm();
    }

    const navigate = useNavigate();

    useEffect(() => {
        resetLoginForm();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loginForm) {
            // accéder aux conf du back
            await axios.post("/user/login", authState, { withCredentials: true }).then(() => {
                authLogIn();
                navigate("/");
            }).catch(err => console.log(err));

            console.log(authState);
        } else {
            await axios.post("/user/signup", authState, { withCredentials: true }).then(() => {
                setLoginForm(!loginForm);
                resetLoginForm();
            }).catch((err) => { console.log(err) });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {(loginForm) ? <>Sign In </> : <>Sign Up</>}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                // autoComplete="email"
                                autoFocus
                                onChange={handleLoginFormOnChange}
                                value={authState.email}
                                inputProps={{ inputMode: "email" }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                // autoComplete="current-password"
                                onChange={handleLoginFormOnChange}
                                value={authState.password}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {(loginForm) ? <>Log In </> : <>Save</>}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {/* <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link> */}
                                    <LinkRouterDom to="/" >Etudiant</LinkRouterDom>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={switchLoginForm}>
                                        {(loginForm) ? <>"Don't have an account? Sign Up"</> : <>"Do you have an account ? Log In"</>}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignInSide;