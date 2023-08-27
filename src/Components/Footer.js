import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
  return (

    <MDBFooter bgColor='light' className='text-center text-lg-left fixed-bottom'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://expense-calculator.com/'>
          expense-calculator.com
        </a>
      </div>
    </MDBFooter>

  )
}
