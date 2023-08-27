import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import { useSignIn } from 'react-auth-kit';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  import { Link } from 'react-router-dom'

export default function Login() {
  const LOGIN_URL = '/api/auth/login';

  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const signIn = useSignIn();
  useEffect(() => {
      emailRef.current.focus();
  }, [])
  const errRef = useRef();


  useEffect(() => {
    setError('');
  }, [email, password])

  const handleSubmit = async (e) => {
    setError('');
      e.preventDefault();

      try {
          const response = await axios.post(LOGIN_URL,
              JSON.stringify({ email, password }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );

          signIn({
            token: response.data.access_token,
            expiresIn: 36000,
            tokenType: "Bearer",
            authState: {email: email, name: response.data.username},
          });
          setEmail('');
          setPassword('');
          setSuccess(true);
      } catch (err) {
          if (!err?.response) {
              setError('No Server Response');
          } else if (err.response?.status === 400) {
            setError('Missing Email or Password');
          } else if (err.response?.status === 401) {
            setError('Invalid Email or Password');
          } else {
              setError(err);
          }
          errRef.current.focus();
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
                window.location.replace('http://127.0.0.1:3000')
            ) : (

        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-5 '>

          <h3 className="fw-bold mb-3 ps-5 pb-3 text-success" style={{letterSpacing: '1px'}}><i>Expense Calculator</i></h3>

          <form onSubmit={handleSubmit}>
          <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>

                        <MDBInput wrapperClass='mb-4 mx-5 w-100' placeholder='Email address'
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <MDBInput wrapperClass='mb-4 mx-5 w-100' placeholder='Password'
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />

          <button className="btn btn-primary mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</button>
          </form>

          <p className='ms-5'>Don't have an account? <Link to="/register" className="link-info">Register here</Link></p>
          <p className='ms-5'><Link to="/forgot-password" className="link-info">Forgot Password?</Link></p>

        </div>
        )}
      </>
      </MDBCol>
      


    </MDBRow>

  </MDBContainer>

  )
}
