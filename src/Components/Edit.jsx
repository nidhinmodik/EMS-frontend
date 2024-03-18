import React, { useEffect, useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'



function Edit() {
//to hold updated value
  const [empid,setId]=useState("")
  const [empname,setName]=useState("")
  const [empage,setAge]=useState("")
  const [empdesignation,setDesignation]=useState("")
  const [empsalary,setSalary]=useState("")
//get a particular id from the url
  const{id}=useParams()
  console.log(id);

  //get a particular employee details
  const getEmployee=async(id)=>{
    const result = await axios.get(`${base_url}/get-an-employee/${id}`)//employee details
    console.log(result.data.employees);//object
    //setEmployeeData(result.data.employees)
    setId(result.data.employees.id)
    setName(result.data.employees.name)
    setAge(result.data.employees.age)
    setDesignation(result.data.employees.designation)
    setSalary(result.data.employees.salary)
  }
  useEffect(()=>{
    getEmployee(id)
  },[])

  const location = useNavigate()

  //update function
  const base_url='http://localhost:8000'
  //api call to update an employee details
  const updateEmployee=async(e)=>{
    e.preventDefault()
    const body={
      id:empid,
      name:empname,
      age:empage,
      designation:empdesignation,
      salary:empsalary
    }
    const result=await axios.post(`${base_url}/update-an-employee/${id}`,body)
    console.log(result);
    alert(result.data.message)
    location('/')
  }




  return (
    <div>
      <div className="container">
        <h2>Edit Employee</h2>
        <form className='P-5'>
        <MDBInput onChange={(e)=>setId(e.target.value)} value={empid} label='ID' id='formControlLg' type='text' size='lg' />
      <br />
      <MDBInput onChange={(e)=>setName(e.target.value)} value={empname} label='NAME' id='formControlLg' type='text' size='lg' />
      <br />
      <MDBInput onChange={(e)=>setAge(e.target.value)} value={empage} label='AGE' id='formControlLg' type='text' size='lg' />
      <br />
      <MDBInput onChange={(e)=>setDesignation(e.target.value)} value={empdesignation} label='DESIGNATION' id='formControlLg' type='text' size='lg' />
      <br />
      <MDBInput onChange={(e)=>setSalary(e.target.value)} value={empsalary} label='SALARY' id='formControlLg' type='text' size='lg' />
      <br />
      <div>
        <button onClick={(e)=>updateEmployee(e)} className='btn btn-success m-3'>UPDATE<i className='fa-solid fa-user-plus'></i></button>
      </div>
        </form>
      </div>
    </div>
  )
}

export default Edit