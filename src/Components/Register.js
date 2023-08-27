import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

// import '.././public/index.css';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/auth/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    // const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const emailRef = useRef();
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [error, setError] = useState("");

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setError('');
    }, [user, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        // const v1 = USER_REGEX.test(user);
        // const v2 = PWD_REGEX.test(password);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ name: user, email, password, password_confirmation: matchPassword }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setSuccess(true);
            setUser('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            console.log(err.response.data);
            if (!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 400) {
                setError("The email has already been taken.");
            } else {
                setError("Something went wrong, please try again")

            }
            errRef.current.focus();
        }
    }

    return (

        <MDBContainer fluid>
    <MDBRow>

    <MDBCol lg='6' className='d-none d-lg-block px-0'>
        <img src="/banner.jpg"
          alt="Login image" className="w-100 h-100" style={{objectFit: 'fill', objectPosition: 'left'}} />
      </MDBCol>

      

      <MDBCol  lg='6' md='12' sm='12'>

        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-5 '>

          <h3 className="fw-bold mb-3 ps-5 pb-3 text-success" style={{letterSpacing: '1px'}}><i>Expense Calculator</i></h3>

          
      {success && (
        <Alert variant='success'>
          Registered Successfully!
          <Alert.Link href="/login"> Login Now</Alert.Link>
        </Alert>
        )}

          <form onSubmit={handleSubmit}>
          <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>

                        <MDBInput wrapperClass='mb-4 mx-5 w-100' placeholder="Full Name"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />

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
                        <MDBInput wrapperClass='mb-4 mx-5 w-100' placeholder='Confirm Password'
                            type="password"
                            id="confirm_Password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                         <p id="confirmnote" className={!validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button className="btn btn-primary mb-4 px-5 mx-5 w-100" color='info' size='lg' disabled={ !validMatch ? true : false}>Sign Up</button>

          </form>

          <p className='ms-5'>Already registered? <Link to="/login" className="link-info">Sign In</Link></p>

        </div>
        
      </MDBCol>
      


    </MDBRow>

  </MDBContainer>

    )
}

export default Register