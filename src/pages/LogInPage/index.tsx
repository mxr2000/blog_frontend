import * as React from 'react';
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
import {useEffect, useState} from "react";
import {Account, LogInSuccessResponse} from '../../../../blog/common/account'
import {ErrorResponse} from '../../../../blog/common'
import axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
import Dropzone from 'react-dropzone-uploader'


const LogInPage = () => {
    const [email, setEmail] = useState('mxr@qq.com')
    const [pwd, setPwd] = useState('654321')
    const navigate = useNavigate()
    const [errorDialogOpen, setErrorDialogOpen] = useState(false)
    const [account, setAccount] = useLocalStorage<Account | undefined>('account', undefined)
    const [token, setToken] = useLocalStorage<string | undefined>('token', undefined)
    const onLogIn = () => {
        const account: Account = {
            email: email,
            pwd: pwd
        }
        axios({
            url: "/api/account/logIn",
            method: 'post',
            data: account
        })
            .then((result: AxiosResponse<LogInSuccessResponse>) => {
                console.log(result)
                setAccount(result.data.data.account)
                setToken(result.data.data.token)
                navigate("/home")
            })
            .catch((err: ErrorResponse) => {
                setErrorDialogOpen(true)
            })
    }
    useEffect(() => {
        if (account != undefined && token != undefined) {
            navigate("/home")
        }
    }, [])

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={pwd}
                            onChange={e => setPwd(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={onLogIn}
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
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Dialog
                open={errorDialogOpen}
                onClose={() => setErrorDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Wrong email or pwd
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setErrorDialogOpen(false)}>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default LogInPage