import React from 'react'
import ClientAccordion from '../traitements-alertes/ClientAccordion'
import PieceThematiqueAccordion from '../traitements-alertes/PieceThematiqueAccordion'
import Grid from '@material-ui/core/Grid'
import SuivieDesDemandeInformationAccordion from '../traitements-alertes/SuivieDesDemandeInformationAccordion'
import DetailsOperationsAccordion from '../traitements-alertes/DetailsOperationsAccordion'
import AnalyseAccordion from './AnalyseAccordion'
import { themeColors } from '../../../../data/variables'
import DetailsPersonneMoraleAccordion from './DetailsPersonneMoraleAccordion'
import DetailsPersonnePhysiqueAccordion from './DetailsPersonnePhysiqueAccordion'
import CommentaireDecisionAccordion from './CommentaireDecisionAccordion'

export default function AlerteAnalyseGroupeAccordions(){
  const styles = {
    accordionTitle : {
        color: themeColors.primary,
        fontSize: '1.1rem',
    }
 } 

  return (
    <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12} md={12}>
          <DetailsOperationsAccordion style={styles} />
        </Grid>

        <Grid item xs={12} md={12}>
            <ClientAccordion style={styles} />
        </Grid>

        <Grid item xs={12} md={12}>
            <SuivieDesDemandeInformationAccordion style={styles} />
        </Grid> 

        <Grid item xs={12} md={12}>
            <DetailsPersonneMoraleAccordion style={styles} />
        </Grid> 

        <Grid item xs={12} md={12}>
            <DetailsPersonnePhysiqueAccordion style={styles} />
        </Grid> 

        <Grid item xs={12} md={12}>
            <PieceThematiqueAccordion style={styles} />
        </Grid>

        <Grid item xs={12} md={12}>
          <AnalyseAccordion style={styles} />
        </Grid>

        <Grid item xs={12} md={12}>
            <CommentaireDecisionAccordion style={styles} />
        </Grid> 
    </Grid>
  )
}

