import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IEtudiant } from '../state/reducers/etudiantReducer';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionEtudiantCreators from "../state/actions/action-creator/etudiantActions";
import { StateType } from '../state/reducers';
import { Input } from '@mui/material';

const unEtudiant: IEtudiant =
{
    id: '',
    nomComplet: {
        nom: '',
        prenom: '',
    },
    dateNaiss: new Date(),
    sexe: '',
    photo: '',
    nbFrere: 0
}

interface FormulaireProps {
    open: boolean;
    onClose: () => void;
    modification: boolean;
}

const Formulaire = (props: FormulaireProps) => {
    const { onClose, open, modification } = props;

    const dispatch = useDispatch();
    const { handleOnChangeChange, handleDateOnChangeChange, fetchDataData, handleFileOnChangeChange } = bindActionCreators(actionEtudiantCreators, dispatch);
    const state: IEtudiant = useSelector((state: StateType) => state.etudiant);
    const listeFromRedux: IEtudiant[] = useSelector((state: StateType) => state.listeEtudiant);

    const handleClose = () => {
        onClose();
    };

    const handleDateOnChange = (e: any) => {
        handleDateOnChangeChange(e);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleOnChangeChange(e);
    }

    const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleFileOnChangeChange(e);
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('etat', state);
        console.log('id', state._id);

        const formData = new FormData();
        formData.append('nom', state.nomComplet.nom);
        formData.append('prenom', state.nomComplet.prenom);
        formData.append('dateNaiss', state.dateNaiss.toString());
        formData.append('sexe', state.sexe);
        formData.append('nbFrere', state.nbFrere.toString());
        formData.append('photo', state.photo);

        if (modification === true) {
            await axios.put(`/etudiant/${state._id}`, state).then(() => {
                fetchDataData();
            }).finally(() => {
                handleClose();
            });
        } else {
            await axios.post('/etudiant', formData).then(() => {
                fetchDataData();
            }).finally(() => {
                handleClose();
            });
        }

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Dialog onClose={handleClose} open={open}>
                <Card sx={{ width: 375 }}>
                    <form onSubmit={handleOnSubmit} encType="multipart/form-data">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Formulaire</Typography>
                            <TextField id="standard-basic" name='nom' label="Nom" variant="standard" sx={{ width: "100%" }} value={state.nomComplet.nom} onChange={handleOnChange} /><br />
                            <TextField id="standard-basic" name='prenom' label="Prénoms" variant="standard" sx={{ width: "100%" }} value={state.nomComplet.prenom} onChange={handleOnChange} />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker sx={{ marginTop: 2 }} label="Date de naissance" value={dayjs(state.dateNaiss)} onChange={(newValue: any) => { handleDateOnChange(newValue) }} />
                                </DemoContainer>
                            </LocalizationProvider>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="sexe" value={state.sexe} onChange={handleOnChange} sx={{ width: '100%' }} >
                                <FormControlLabel value="masculin" control={<Radio />} label="Homme" />
                                <FormControlLabel value="feminin" control={<Radio />} label="Femme" />
                            </RadioGroup>
                            <TextField type="number" label="Frères et soeurs" name='nbFrere' onChange={handleOnChange} value={state.nbFrere} variant="standard" sx={{ width: "100%" }} />
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                style={{ marginTop: 5 }}
                                name="photo"
                                onChange={handleOnFileChange}
                            />

                        </CardContent>
                        <CardActions sx={{ display: "flex", justifyContent: 'end' }}>
                            <Button endIcon={<SendIcon />} type='submit'>Enregistrer</Button>
                        </CardActions>
                    </form>
                </Card>
            </Dialog>
        </div >
    );
}

export default Formulaire;