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

import { doCreateUser } from '../../service/User';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = (props) => {
    const classes = useStyles();
    const [username, setUsername] = React.useState('');
    const [site, setSite] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
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

    const handleSubmit = async () => {
        const urlRegEx = '^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';

        if (password === '' || email === '' || passwordConfirm === '' || site === '' || username === '') {
            setSeverity("warning");
            setNotificationMessage("Preencher todos os campos!");
            handleClick();
            return null;
        }

        if (password !== passwordConfirm) {
            setSeverity("warning");
            setNotificationMessage("Senhas não conferem!");
            handleClick();
            return null;
        }

        if (!site.match(urlRegEx)) {
            setSeverity("warning");
            setNotificationMessage("Site deve serguir o formato \"www.google.com.br\"");
            handleClick();
            return null;
        }

        const newUser = {
            username: username,
            email: email,
            password: password,
            siteUrl: site
        }

        try {
            await doCreateUser(newUser);
            setSeverity("success");
            setNotificationMessage("Cadastro realizado com sucesso!");
            handleClick();
            setTimeout(() => {
                history.push("/entrar");
            }, 1000)
            window.location.reload();
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
                    Bem-vindo!
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nome do usuário"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={e => { setUsername(e.target.value) }}
                    />
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password-confirm"
                        label="Confirmar Senha"
                        type="password"
                        id="password-confirm"
                        autoComplete="current-password"
                        value={passwordConfirm}
                        onChange={e => { setPasswordConfirm(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="site"
                        label="Seu site"
                        name="site"
                        autoComplete="site"
                        autoFocus
                        value={site}
                        onChange={e => { setSite(e.target.value) }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => handleSubmit()}
                    >
                        Cadastrar
                    </Button>

                    <Grid container>

                        <Grid item xs />

                        <Grid item>
                            <Link to="/entrar" variant="body2">
                                {"Já possui conta? Entre"}
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

export default SignUp;