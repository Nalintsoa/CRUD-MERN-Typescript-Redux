import { Button, Card, CardActions, CardContent, Dialog, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { StateType } from "../state/reducers";
import { IEtudiant } from "../state/reducers/etudiantReducer";
import PrintIcon from '@mui/icons-material/Print';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type EtudiantInfoProps = {
    open: boolean;
    onClose: () => void
}

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

const EtudiantInfo = (props: EtudiantInfoProps) => {
    const etudiantStore: IEtudiant = useSelector((state: StateType) => state.etudiant);

    const printRef = useRef<HTMLDivElement>(null);

    const printPDF = () => {
        const doc = new jsPDF({
            format: 'a4'
        });
        const printElement = printRef.current;

        if (printElement) {
            doc.html(printElement, {
                callback: function (doc) {
                    // doc.save('test.pdf');
                    doc.autoPrint();
                    doc.output('dataurlnewwindow', { filename: 'test.pdf' })
                },
            });
        }
    }

    const { open, onClose } = props;
    return (
        <Dialog open={open} onClose={onClose}>
            <Card style={{ width: 500 }} >
                <CardContent ref={printRef}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                                Carte d'identité
                            </Typography>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="body2" component="h6" sx={{ display: 'flex', alignItems: 'baseline' }}>
                                Nom <Typography variant="h6">...</Typography>
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'baseline' }}>
                                Prénom(s) <Typography variant="h6">...</Typography>
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'baseline' }}>
                                Né le <Typography variant="h6">...</Typography>
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'baseline' }}>
                                Genre <Typography variant="h6">...</Typography>
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'baseline' }}>
                                Collatéraux <Typography variant="h6">...</Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6">{etudiantStore.nomComplet.nom}</Typography>
                            <Typography variant="h6" >{etudiantStore.nomComplet.prenom}</Typography>
                            <Typography variant="h6" >{formatDate(new Date(etudiantStore.dateNaiss))}</Typography>
                            <Typography variant="h6">{etudiantStore.sexe}</Typography>
                            <Typography variant="h6">{etudiantStore.nbFrere}</Typography>

                        </Grid>
                        <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <img src={`http://localhost:5000/etudiant/images/${etudiantStore.photo}`} style={{ height: 120, width: 120 }} />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: 'end', marginRight: 5 }}>
                    <Button startIcon={<PrintIcon />} onClick={printPDF}><u>Imprimer</u></Button>
                </CardActions>
            </Card>
        </Dialog>
    );
}

export default EtudiantInfo;