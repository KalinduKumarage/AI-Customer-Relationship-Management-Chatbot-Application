import React from 'react';
import jsPDF from 'jspdf';
import { Button } from "@material-ui/core";

class PDF_Consult extends React.Component {
   
    constructor(props) {
        super(props)
        this.state ={}
    };

    generatePDFCon = () => {
      var doc = new jsPDF('p', 'pt');
      
      doc.addFont('helvetica', 'normal')
      doc.setFontSize('24')
      doc.text(30, 60, 'My Consultations Report')
      doc.text(400, 60, 'Digital Pulz')

      doc.addFont('helvetica', 'normal')
      doc.setFontSize('12')
      doc.text(30, 120, 'Doctor Name: Dr BJC Perera')
      doc.text(30, 140, 'Appointment No: 01')      
      doc.text(30, 160, 'Patient Name: Dihan Perera')  
      doc.text(30, 180, 'Appointment Time: 9:30') 

      doc.addFont('helvetica', 'normal')
      doc.setFontSize('9')
      doc.text(30, 300, 'Auto-generated PDF report')

      doc.save('MyConsultReport.pdf')
     
    }   
    
   render() {
      return (
         <div>
            <Button color="primary" variant="contained" onClick={this.generatePDFCon} type="primary">Print</Button> 
         </div>
      );
   }
}

export default PDF_Consult;