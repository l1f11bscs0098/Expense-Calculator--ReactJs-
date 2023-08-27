import React from 'react'
import axios from '../api/axios';

export default function DownloadPDF(props) {

    const generatePDF = async() => {
        try {
            const URL = 'api/expense/generate-pdf';
            const filter = props.filter;
          console.log(filter);
          await axios.post(URL,
               
                JSON.stringify({ filter }),
                {
                  headers: {
                    Authorization: props.token,
                    'Content-Type': 'application/json'
                  },
                  responseType: 'blob',
                  withCredentials: true
                }
            ).then((response) => {
              console.log(response);
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'expense.pdf');
              document.body.appendChild(link);
              link.click();
            });
        }catch(error){
          console.log(error);
        }
      }

  return (
    <center>
      <button onClick={generatePDF} className='btn btn-primary btn-md mt-4'>Generate PDF</button>
      
    </center>
  )
}
