import React from 'react'
import Form from 'react-bootstrap/Form';
import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import Alert from 'react-bootstrap/Alert';
import {useAuthHeader} from 'react-auth-kit'

export default function AddExpense(props) {
  
  const authHeader = useAuthHeader();
  const token = authHeader();

    const URL = 'api/expense/store';
    const [title, setTitle] = useState('');
    const titleRef = useRef();

    const [cost, setCost] = useState('');
    const costRef = useRef();

    const [date, setDate] = useState('');
    const dateRef = useRef();

    const [category, setCategory] = useState('');
    const categoryRef = useRef();

    const [description, setDescription] = useState('');
    const descriptionRef = useRef();

    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
        const response = await axios.post(URL,
           
            JSON.stringify({ title, cost, date, category, description }),
            {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json'
              },
              withCredentials: true
            }
        );
      setSuccess(true);
      setSuccessMessage("Expense added successfully!");
      setTitle('');
      setCost('');
      setDate('');
      setCategory('');
      setDescription('');
    }catch(error){
      setErrorMessage("Something went wrong!");
console.log(error);
    }

}
  return (
    <div className='container new-expense-container'>
        <h3>Add new expense</h3>
        {success && (
        <Alert variant='success' onClose={() => setSuccess(false)} dismissible>
          {successMessage}
        </Alert>
                )}
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Expense Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" ref={titleRef} required
        autoComplete="off" onChange={(e) => setTitle(e.target.value)} value={title} id='title' name='title' />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Cost</Form.Label>
        <Form.Control type="number" placeholder="Enter cost (AED)" id='cost' name='cost' required
        autoComplete="off" onChange={(e) => setCost(e.target.value)} value={cost} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Expense Date</Form.Label>
        <Form.Control type="date" placeholder="Select Date" id='date' name='date' required
        autoComplete="off" onChange={(e) => setDate(e.target.value)} value={date} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Expense Category</Form.Label>
        <Form.Control type="text" placeholder="Enter Category" id='category' name='category' required
        autoComplete="off" onChange={(e) => setCategory(e.target.value)} value={category} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} id='description' name='description'
        autoComplete="off" onChange={(e) => setDescription(e.target.value)} value={description} />
      </Form.Group>

      <button className="btn btn-primary" color='info' size='lg'>Submit</button>

    </Form>
      
    </div>
  )
}
