import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';


export default function ForgotPassword() {
    const URL = '/api/auth/forgot-password';
    const [email, setEmail] = useState('');
    const emailRef = useRef();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const response = await axios.post(URL,
                JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
          setSuccess(true);
        }catch(error){
          setErrorMessage("Something went wrong!");
console.log(error);
        }
  
    }
  return (
    <MDBContainer fluid>
    <MDBRow>

    <MDBCol lg='6' className='d-none d-lg-block px-0'>
        <img src="/banner.jpg"
          alt="Login image" className="w-100" style={{objectFit: 'fill', objectPosition: 'left'}} />
      </MDBCol>

      <MDBCol  lg='6' md='12' sm='12'>
      <>
      {success ? (
                <section className='success-section'>
                <h4>Email sent Successfully with reset password link</h4>
                <br />
                <p>
                    <Link to="/login" className='btn btn-primary'>Go to Login</Link>
                </p>
            </section>
            ) : (
            
      <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-5 '>

        <h3 className="fw-bold mb-3 ps-5 pb-3 text-success" style={{letterSpacing: '1px'}}><i>Expense Calculator</i></h3>
        {errorMessage && (
        <p className="error"> {errorMessage} </p>
        )}


        <form onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' placeholder='Email address'
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
          <button className="btn btn-primary mb-4 px-5 mx-5 w-100" color='info' size='lg'>Submit</button>

        </form>
        </div>
            )}
            </>
      </MDBCol>
      </MDBRow>
      </MDBContainer>


  )
}
