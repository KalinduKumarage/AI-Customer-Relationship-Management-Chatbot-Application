import React from 'react';
import jsPDF from 'jspdf'
import { Button } from "@material-ui/core";

class PDF extends React.Component {
   
    constructor(props) {
        super(props)
        this.state ={}
    };

    generatePDF = () => {
      var doc = new jsPDF('p', 'pt');
      
      doc.addFont('helvetica', 'normal')
      doc.setFontSize('24')
      doc.text(30, 60, 'User Report')
      doc.text(400, 60, 'Digital Pulz')

      doc.addFont('helvetica', 'normal')
      doc.setFontSize('12')
      doc.text(30, 120, 'Name: Etharu')
      doc.text(30, 140, 'Last Name: De Silva')      
      doc.text(30, 160, 'Gender: Male')  
      doc.text(30, 180, 'Phone: 078435646') 

      doc.addFont('helvetica', 'normal')
      doc.setFontSize('9')
      doc.text(30, 300, 'Auto-generated PDF report')

      doc.save('UserReport.pdf')
    }   
    
   render() { 
      return (
         <div>
            <Button color="primary" variant="contained" onClick={this.generatePDF} type="primary">Generate Report</Button> 
         </div>
      );
   }
}

export default PDF;