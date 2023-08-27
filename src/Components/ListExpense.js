import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Swal from 'sweetalert2';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DownloadPDF from './DownloadPDF';
const StyledSwal = Swal.mixin({
    customClass: {
      container: 'container-class',
      popup: 'popup-class',
      header: 'header-class',
      title: 'p-card-title',
      content: 'content-class',
      closeButton: 'close-button-class',
      image: 'image-class',
      input: 'input-class',
      actions: 'actions-class',
      confirmButton: 'p-button p-button-raised p-button-danger p-button-text-icon-left',
      cancelButton: 'p-button p-button-raised p-button-info p-button-text-icon-left',
      footer: 'footer-class'
    },
    buttonsStyling: false
  });

export default function ListExpense(props) {
    const [expenseList, getExpenseList] = useState('');
    const [categories, getCategories] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [expenseId, setExpenseId] = useState('');
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

    const [categoryFilter, setCategoryFilter] = useState('');
    const categoryFilterRef = useRef();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleEdit = (expense) =>{
        setExpenseId(expense.id);
        setTitle(expense.title);
        setCost(expense.cost);
        setDate(expense.date);
        setCategory(expense.category);
        setDescription(expense.description);

        setShow(true);
    } 

    useEffect(() => {

        console.log(categoryFilter);
        if(categoryFilter != "")
        props.getExpenseList(categoryFilter);
        else
        props.getExpenseList("");

    }, [categoryFilter]);
    

    useEffect(() => {
        getExpenseList(props.expenseList);
        getCategories(props.categories);
    }, [props.expenseList]);

    const deleteExpense = async (data) => {
        StyledSwal.fire({
          title: 'Are you sure?',
          text: `Confirm to delete expense: ${data.title}.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '<span className="pi pi-trash p-button-icon-left btn btn-danger"></span><span className="p-button-text">Delete</span>',
          cancelButtonText: '<span className="pi pi-ban p-button-icon-left"></span><span className="p-button-text">No</span>',
          confirmButtonColor: '#f76452',
          cancelButtonColor: '#3085d6',
          focusConfirm: false,
          focusCancel: true
        })
          .then((result) => {

            if (result.isConfirmed) {
                let id = data.id;
                const URL = 'api/expense/delete';


                try {
                    const response = axios.post(URL,
                       
                        JSON.stringify({ id }),
                        {
                          headers: {
                            Authorization: props.token,
                            'Content-Type': 'application/json'
                          },
                          withCredentials: true
                        }
                    );
                  setSuccess(true);
                  props.getExpenseList("");
                  setSuccessMessage("Expense deleted successfully!");

                }catch(error){
                  setErrorMessage("Something went wrong!");
                }

            }
          });
      };
      const handleFilter = async (e) => {
        e.preventDefault();
      }

      const handleUpdate = async (e) => {
        e.preventDefault();
        setShow(false);

        try {
            const URL = 'api/expense/update';
            const response = await axios.post(URL,
               
                JSON.stringify({ expenseId, title, cost, date, category, description }),
                {
                  headers: {
                    Authorization: props.token,
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true
                }
            );
            setSuccess(true);
            props.getExpenseList("");
            setSuccessMessage("Expense updated successfully!");
            setExpenseId('');
            setTitle('');
            setCost('');
            setDate('');
            setCategory('');
            setDescription('');
        }catch(error){
          setErrorMessage("Something went wrong!");
        }

      }

  return (
    <div className='container mt-2 w-50'>
        <h3>Expense List</h3>
        {success && (
        <Alert variant='success' onClose={() => setSuccess(false)} dismissible>
          {successMessage}
        </Alert>
                )}

    <Form>
    <Form.Select aria-label="Select Category" className='select-filter' onChange={(e) => setCategoryFilter(e.target.value)}>
      <option value='' selected>Filter by Category</option>
      {categories.length > 0?
      categories.map((category) => {
            return (
      <option value={category.category}>{category.category}</option>
      )
    }):
  <></>
  }

    </Form.Select>
        
    </Form>

    <ListGroup as="ol" numbered>
          {expenseList.length > 0?

          expenseList.map((expense, index) => {
            return (
            
                <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{expense.title}</div>
                    {expense.category}
                    <div>{expense.date}</div>
                    <div>{expense.description}</div>
                    <div className='w-100'>
                    <Button className='btn btn-primary btn-sm' onClick={() => handleEdit(expense)}>Edit</Button>&nbsp;&nbsp;&nbsp;
                    <Button className='btn btn-danger btn-sm ml-2' onClick={() => deleteExpense(expense)}>Delete</Button>
                    </div>
                </div>
                <Badge bg="success" pill>
                    {expense.cost} AED
                    
                </Badge>
                
                </ListGroup.Item>
              
            )
          }
          
          ):
          "No record found"
        }
    </ListGroup>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdate}>
        <Form.Control type="hidden"
        autoComplete="off" onChange={(e) => setExpenseId(e.target.value)} value={expenseId} id='id' name='id' />
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
      <button className="btn btn-primary" color='info' size='lg'>Update</button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {categories.length > 0?
      <DownloadPDF token = {props.token} filter = {categoryFilter}></DownloadPDF>
      :
        <></>
    }

</div>
             
  
  )
}
