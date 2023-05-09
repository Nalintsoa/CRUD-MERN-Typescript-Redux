import Formulaire from './Formulaire';
import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionEtudiantCreators from "../state/actions/action-creator/etudiantActions";

const SimpleDialogDemo = () => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { reset } = bindActionCreators(actionEtudiantCreators, dispatch);

  const handleClickOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <Button variant="contained" onClick={handleClickOpen} sx={{ marginRight: 2 }}> Nouveau </Button>
      < Formulaire open={open} onClose={handleClose} modification={false} />
    </div>
  );
}

export default SimpleDialogDemo;