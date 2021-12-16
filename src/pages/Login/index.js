import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Link, useHistory } from "react-router-dom";

import { doLogin } from '../../service/User';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
    const classes = useStyles();
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const [notificationMessage, setNotificationMessage] = React.useState('');

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const login = async () => {

        if (password === '' || email === '') {
            setSeverity("warning");
            setNotificationMessage("Preencher todos os campos!");
            handleClick();
            return null;
        }

        const userToLogin = {
            email: email,
            password: password
        }

        try {
            const res = await doLogin(userToLogin);
            setEmail('');
            setPassword('');
            localStorage.setItem("token", JSON.stringify(res.data))
            setTimeout(() => {
                history.push("/dashboard");
                window.location.reload();
            }, 1000)
        } catch (error) {
            setSeverity("error");
            setNotificationMessage("Usuário ou senha inválida");
            handleClick();
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Bem-vindo de volta!
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => login()}
                    >
                        Entrar
                    </Button>

                    <Grid container>

                        <Grid item xs />

                        <Grid item>
                            <Link to="/cadastrar" variant="body2">
                                {"Não possui conta? Cadastre-se"}
                            </Link>
                        </Grid>

                    </Grid>
                </form>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {notificationMessage}
                </Alert>
            </Snackbar>

        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        width: '25%',
        paddingTop: '25%',
        paddingBottom: '10%'
    }
}));

export default Login;