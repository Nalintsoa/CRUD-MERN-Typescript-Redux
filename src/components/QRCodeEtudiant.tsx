import { Card, CardContent, Dialog } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../state/reducers";

type QRCodeProps = {
    open: boolean,
    onClose: () => void
}

const QRCodeEtudiant = (props: QRCodeProps) => {
    const { open, onClose } = props;
    const etudiantStore = useSelector((state: StateType) => state.etudiant);
    const etudiantString = JSON.stringify(etudiantStore);
    return (
        <Dialog open={open} onClose={onClose}>
            <Card>
                <CardContent>
                    <QRCodeSVG value={etudiantString} />
                </CardContent>
            </Card>
        </Dialog>
    )
}

export default QRCodeEtudiant;