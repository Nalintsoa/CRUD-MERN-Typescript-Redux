import React from 'react'
import BoutonOuvrirFormulaire from '../components/BoutonOuvrirFormulaire'
import StickyFooter from '../components/Footer'
import TableEtudiant from '../components/TableEtudiant'
import MenuAppBar from '../components/topbar'

const EtudiantPage = () => {
    return (
        <>
            <MenuAppBar />
            <div style={{ marginBottom: 20 }}></div>
            <BoutonOuvrirFormulaire />
            <TableEtudiant />
            {/* <StickyFooter><TableEtudiant /></StickyFooter> */}
            <StickyFooter />
        </>
    )
}

export default EtudiantPage