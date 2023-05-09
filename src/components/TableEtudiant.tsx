import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { IEtudiant } from '../state/reducers/etudiantReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Formulaire from './Formulaire';
import { useDispatch, useSelector } from 'react-redux';
import * as actionEtudiantCreators from "../state/actions/action-creator/etudiantActions";
import { StateType } from '../state/reducers';
import { bindActionCreators } from 'redux';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import EtudiantInfo from './EtudiantInfo';
import { printEtudiant } from './printEtudiant';
import QRCodeEtudiant from './QRCodeEtudiant';
import { LinearProgress } from '@mui/material';

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

const TableEtudiant = () => {
    const [open, setOpen] = React.useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const dispatch = useDispatch();
    const { createEtudiant, fetchDataData } = bindActionCreators(actionEtudiantCreators, dispatch);
    const state: IEtudiant = useSelector((state: StateType) => state.etudiant);
    const listeFromRedux: IEtudiant[] = useSelector((state: StateType) => state.listeEtudiant);

    const deleteEtudiant = async (id: string, photo: string) => {
        await axios.delete(`/etudiant/${id}/${photo}`).then(() => {
            fetchDataData();
        });
    }

    const handlePdfOpen = (etudiant: IEtudiant) => {
        createEtudiant(etudiant);
        printEtudiant(etudiant);
    }

    const handleClickOpen = (etudiant: IEtudiant) => {
        createEtudiant(etudiant);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openQR, setOpenQR] = useState(false);

    const handleQROpen = (etudiant: IEtudiant) => {
        createEtudiant(etudiant);
        setOpenQR(true)
    }

    const handleQRClose = () => {
        setOpenQR(false)
    }

    const columns: GridColDef[] = [
        {
            field: 'photo',
            headerName: 'Photo',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            // width: 110,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            // cellClassName: 'super-app-theme--cell',
            renderCell: (params) => {
                return (
                    <>
                        <Avatar src={`http://localhost:5000/etudiant/images/${params.row.photo}`} />
                        {/* {params.row.photo} */}
                    </>
                )
            }
        },
        {
            field: '_id',
            headerName: 'ID',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            // cellClassName: 'super-app-theme--cell' 
        },
        {
            field: 'Nom',
            headerName: 'Nom',
            // width: 150,
            flex: 1,
            editable: true,
            valueGetter: (params) => {
                return params.row.nomComplet.nom
            },
            headerAlign: 'left',
            align: 'left',
            // cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'prenom',
            headerName: 'Prénoms',
            // width: 150,
            flex: 1,
            editable: true,
            headerAlign: 'left',
            align: 'left',
            // cellClassName: 'super-app-theme--cell',
            valueGetter: (params) => {
                return params.row.nomComplet.prenom
            },
        },
        {
            field: 'dateNaiss',
            headerName: 'Date de naissance',
            // width: 150,
            flex: 1,
            editable: true,
            headerAlign: 'left',
            align: 'left',
            // cellClassName: 'super-app-theme--cell',
            valueGetter: (params) => {
                return formatDate(new Date(params.row.dateNaiss))
            }
        },
        {
            field: 'sexe',
            headerName: 'Sexe',
            // width: 110,
            flex: 1,
            editable: true,
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => {
                if (params.row.sexe === "feminin") {
                    return "Féminin"
                } else {
                    return "Masculin"
                }
            }
        },
        {
            field: 'nbFrere',
            headerName: 'Frères/soeurs',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            // width: 160,
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            // cellClassName: 'super-app-theme--cell'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            headerAlign: 'center',
            width: 160,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem icon={<DeleteIcon color='error' />} onClick={() => { deleteEtudiant(params.id.toString(), params.row.photo?.toString()) }} label="Delete" />,
                <GridActionsCellItem icon={<SettingsBackupRestoreIcon color='primary' />} onClick={() => handleClickOpen(params.row)} label="Set" />,
                <GridActionsCellItem icon={<VisibilityIcon />} onClick={() => handlePdfOpen(params.row)} label="Print" showInMenu />,
                <GridActionsCellItem icon={<QrCodeScannerIcon />} label="QRCode" title='QRCode' onClick={() => { handleQROpen(params.row) }} showInMenu />,
            ]
        }
    ];

    useEffect(() => {
        fetchDataData();
        console.log(listeFromRedux);
    }, [])

    return (
        <>
            <Formulaire open={open} onClose={handleClose} modification={true} />
            <QRCodeEtudiant open={openQR} onClose={handleQRClose} />
            <Box sx={{
                height: 400, marginLeft: 2, marginRight: 2,
                '& .super-app-theme--cell': {
                    borderLeft: 'solid 1px #f5f5f5',
                    borderRight: 'solid 1px #f5f5f5',
                },
            }}>
                <DataGrid
                    rows={listeFromRedux}
                    columns={columns}
                    checkboxSelection
                    getRowId={(row => row._id)}
                    autoHeight
                    slots={{
                        toolbar: GridToolbar,
                        loadingOverlay: LinearProgress
                    }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[3, 5, 10, 15]}
                />
            </Box>
        </>
    );
}

export default TableEtudiant;