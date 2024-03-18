import React, { useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'


function Add() {

  const location = useNavigate()

  const [id,setId]=useState("")
  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [designation,setDesignation]=useState("")
  const [salary,setSalary]=useState("")
  console.log(id);


  const base_url = 'http://localhost:8000/add-an-employee'
  const addEmployee=async(e)=>{
    e.preventDefault()
    //add employee - API call
    console.log(id,name,age,designation,salary);

    //API call to add employee details to the mongodb
    const body = {id,name,age,designation,salary}
    const result = await axios.post(base_url,body).then((result)=>{
      console.log(result);
      alert(result.data.message)
      location('/')
    }).catch((error)=>{
      alert("Please Enter a unique employee id")
    })
    
  }

  return (
    <div>
      <div className="container">
        <h2>Add Employee</h2>
        <form className='P-5'>
        <MDBInput onChange={(e)=>setId(e.target.value)} label='ID' id='formControlLg' type='text' size='lg' />
      <br />
      <MDBInput onChange={(e)=>setName(e.target.value)} label='NAME' id='formControlLg' type='text' size='lg' />
      <br />
      <MDBInput onChange={(e)=>setAge(e.target.value)} label='AGE' id='formControlLg' type='text' size='lg' />
      <br />
      <MDBInput onChange={(e)=>setDesignation(e.target.value)} label='DESIGNATION' id='formControlLg' type='text' size='lg' />
      <br />
      <MDBInput onChange={(e)=>setSalary(e.target.value)} label='SALARY' id='formControlLg' type='text' size='lg' />
      <br />
      <div>
        <button onClick={(e)=>addEmployee(e)} className='btn btn-success m-3'>Add<i className='fa-solid fa-user-plus'></i></button>
      </div>
        </form>
      </div>
    </div>
  )
}

export default Add