import jsPDF from 'jspdf'
import "jspdf-autotable"
import { IEtudiant } from '../state/reducers/etudiantReducer';
import backgroundImage from '../assets/th.jpg';

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

export const printEtudiant = (etudiant: IEtudiant) => {

    // let emp = params.row;

    let doc = new jsPDF({
        orientation: 'l',
        format: [150, 95]
    });
    //

    doc.setDrawColor('#34495e')
    doc.rect(9, 9, 132, 72);
    // doc.roundedRect(12, 12, 126, 66, 1, 1);
    doc.addImage(backgroundImage, "JPEG", 10, 10, 130, 70)

    //Titre
    doc.setFontSize(16)
    doc.text("Carte d'identité scolaire", 50, 20);

    //ajouter une image 
    doc.rect(100, 30, 35, 35);
    doc.addImage(`http://localhost:5000/etudiant/images/${etudiant.photo}`, "JPEG" || "PNG", 100, 30, 35, 35,)

    doc.setFontSize(12);

    doc.setDrawColor('#bdc3c7');
    doc.text(`Nom`, 15, 30);
    doc.text(`${etudiant.nomComplet.nom}`, 32, 30);
    doc.rect(30, 25, 65, 7)

    doc.text(`Prenom`, 15, 40)
    doc.text(`${etudiant.nomComplet.prenom}`, 37, 40)
    doc.rect(35, 35, 60, 7)

    doc.text(`Collatéraux`, 15, 50)
    doc.text(`${etudiant.nbFrere}`, 42, 50)
    doc.rect(40, 45, 55, 7)

    doc.text(`Date de naissance`, 15, 60)
    doc.text(`${formatDate(new Date(etudiant.dateNaiss))}`, 57, 60)
    doc.rect(55, 55, 40, 7)

    doc.text(`Genre`, 15, 70)
    doc.text(`${etudiant.sexe}`, 32, 70)
    doc.rect(30, 65, 65, 7)

    //doc.save("emp.pdf")

    doc.autoPrint();
    doc.output('dataurlnewwindow', { filename: "empl.pdf" });


}