import React, {useEffect, useState} from 'react'
import ListExpense from './ListExpense'
import {useAuthHeader} from 'react-auth-kit'
import axios from '../api/axios';


export default function Home(props) {
  const authHeader = useAuthHeader();
  const token = authHeader();

  const [expenseList, setExpenseList] = useState('');
  const [categories, setCategories] = useState('');


  const getExpenseList = async(filter) => {
    try {
        const URL = 'api/expense/list';

        const response = await axios.post(URL,
           
            JSON.stringify({ filter }),
            {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json'
              },
              withCredentials: true
            }
        );
        setExpenseList(response.data.data);
        setCategories(response.data.categories);
    }catch(error){
      console.log(error);
    }
}
useEffect(() => {
  getExpenseList();
}, []);


  return (
    <div>
      <ListExpense expenseList={expenseList} categories={categories} getExpenseList={getExpenseList} token={token}></ListExpense>
    </div>
  )
}
