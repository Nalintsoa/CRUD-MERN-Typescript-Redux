import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Button, Card, CardContent, Grid, TextField, IconButton } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import SendIcon from '@mui/icons-material/Send';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

type FooterProps = {
    children?: React.ReactNode;
}

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const StickyFooter = (props: FooterProps) => {
    const formMail = useRef<HTMLDivElement>(null);
    const [heightColumn, setheightColumn] = useState(0);
    useEffect(() => {
        if (formMail.current) {
            // console.log(formMail.current.getBoundingClientRect().height)
            setheightColumn(formMail.current.getBoundingClientRect().height)
        }
    }, [formMail]);

    // Pour le mail;
    const initialMail = {
        adresse_mail: '',
        objet_mail: '',
        texte_mail: '',
        piece_jointe: '',
    }

    const [mailer, setMailer] = useState(initialMail);

    const pieceRef = useRef<HTMLInputElement>(null);

    const [nomPJ, setNomPJ] = useState('');

    const resetFileSelect = () => {
        setNomPJ('');
        setMailer({ ...mailer, piece_jointe: '' });
    }

    const handleOnFileSelect = (e: any) => {
        if (e.target) {
            setMailer({ ...mailer, piece_jointe: e.target.files[0] });
            setNomPJ(e.target.files[0].name);
        }
    }

    const openFileSelector = () => {
        if (pieceRef.current) {
            pieceRef.current.click();
        }
    }

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMailer({ ...mailer, [e.target.name]: e.target.value })
    }

    // const sendMail = async () => {
    //     let formData = new FormData();
    //     formData.append('adresse_mail', mailer.adresse_mail);
    //     formData.append('objet_mail', mailer.objet_mail);
    //     formData.append('texte_mail', mailer.texte_mail);
    //     formData.append('piece_jointe', mailer.piece_jointe);
    //     await axios.post('/mail/send', formData);
    // }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('adresse_mail', mailer.adresse_mail);
        formData.append('objet_mail', mailer.objet_mail);
        formData.append('texte_mail', mailer.texte_mail);
        formData.append('piece_jointe', mailer.piece_jointe);

        await axios.post('/mail/send', formData).then(() => {
            alert('Mail envoyé');
            setMailer(initialMail);
        }).catch((err) => {
            console.log(err);
            alert('Mail non envoyé');
        });
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // minHeight: '100vh',
            }}
        >
            {/* {props.children} */}
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[800],
                            border: 'none'
                        }} variant='outlined'>
                            <CardContent sx={{ minHeight: heightColumn }}>
                                <Typography variant="h5" gutterBottom>
                                    À propos de nous
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor ipsum sed ex vulputate, non dictum sem feugiat. Nullam non ante non dolor faucibus sodales.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[800],
                            border: 'none'
                        }} variant='outlined'>
                            <CardContent sx={{ minHeight: heightColumn }}>
                                <Typography variant="h5" gutterBottom>
                                    Suivez-nous
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                    <IconButton aria-label="Facebook">
                                        <Facebook />
                                        <Typography variant="body2" sx={{ marginLeft: 2 }}>
                                            Facebook
                                        </Typography>
                                    </IconButton>
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                    <IconButton aria-label="Twitter">
                                        <Twitter />
                                        <Typography variant="body2" sx={{ marginLeft: 2 }}>
                                            Twitter
                                        </Typography>
                                    </IconButton>
                                </Typography>

                                <Typography variant='body2' gutterBottom>
                                    <IconButton aria-label="LinkedIn">
                                        <LinkedIn />
                                        <Typography variant="body2" sx={{ marginLeft: 2 }}>
                                            LinkedIn
                                        </Typography>
                                    </IconButton>
                                </Typography>

                                <Typography variant='body2' gutterBottom>
                                    <IconButton aria-label="Instagram">
                                        <Instagram />
                                        <Typography variant="body2" sx={{ marginLeft: 2 }}>
                                            Instagram
                                        </Typography>
                                    </IconButton>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[800],
                        }}
                        >
                            <form onSubmit={handleOnSubmit} encType="multipart/form-data">
                                <CardContent ref={formMail}>
                                    <input type='file' ref={pieceRef} hidden onChange={handleOnFileSelect} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        Contactez-nous
                                        <IconButton onClick={openFileSelector}><AttachFileIcon /></IconButton>
                                        <Typography variant='body2'>{nomPJ}{mailer.piece_jointe && <IconButton onClick={resetFileSelect}><CloseIcon /></IconButton>}</Typography>
                                    </Typography>
                                    <TextField id="standard-basic" name='adresse_mail' label="Adresse mail" value={mailer.adresse_mail} onChange={handleOnchange} variant="standard" sx={{ width: "100%" }} /><br />
                                    <TextField id="standard-basic" name='objet_mail' label="Objet" variant="standard" value={mailer.objet_mail} onChange={handleOnchange} sx={{ width: "100%", marginTop: 2 }} />
                                    <TextField multiline rows={3} label="Votre message" name='texte_mail' variant="outlined" value={mailer.texte_mail} onChange={handleOnchange} sx={{ width: "100%", marginTop: 2 }} />
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: 'end' }}>
                                    <Button endIcon={<SendIcon />} type='submit'>Envoyer</Button>
                                </CardActions>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}

export default StickyFooter;