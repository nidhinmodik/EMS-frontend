import React, { useEffect , useState } from 'react'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Admin() {
  //Api fetching - to get all the employees details
  const base_url='http://localhost:8000'

  //state creation
  const [allEmployees,setAllEmployees]=useState([])//to hold all employees details

  const fetchData=async()=>{
    const result = await axios.get(`${base_url}/get-all-employees`)//details from server
    console.log(result);
    setAllEmployees(result.data.employees)
  }
  console.log(allEmployees);//array of employees

  const deleteEmp=async(id)=>{
    const result=await axios.delete(`${base_url}/delete-an-employee/${id}`)
    console.log(result);
    alert(result.data.message)
    fetchData()
  }

  useEffect(()=>{
    fetchData()
  },[])



  return (
    <div>
        <h1 className='text-center text-primary m-4'>Employee Management System</h1>
        <div className="container">
        <p style={{textAlign:'justify'}}> An employee management system is a tool that companies use to organize their employee data and key functions within their HR department, including recruitment & onboarding, time and attendance tracking, performance management, training & development, payroll, and benefits administration. They are a type of workforce management tool that acts as a single source of truth for your HR professionals and employees alike.
        </p>
        <Link to={'/add'}>
        <a className='btn btn-primary m-5' style={{float:'right',margin:'10px'}} href="">Add</a>
        </Link>
        </div>
        <div className='container'>
        <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
        <th scope='col'>Id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Age</th>
          <th scope='col'>Designation</th>
          <th scope='col'>Salary</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
          allEmployees.map((item)=>(
            <tr key={item.id}>
          <td>
            {item.id}
          </td>
          <td>
            {item.name}
          </td>
          <td>
            {item.age}
          </td>
          <td>
            {item.designation}
          </td>
          <td>
            {item.salary}
          </td>
          <td>
            <div className='d-flex justify-content-evenly'>
              <Link to={`view/${item.id}`}>
              <i className='fa-solid fa-eye'></i>
              </Link>
              <Link to={`edit/${item.id}`}>
              <i className='fa-solid fa-pen text-primary'></i>
              </Link>
              
              <i onClick={()=>deleteEmp(item.id)} className='fa-solid fa-trash text-danger'></i>
              
            </div>
          </td>
        </tr>
          ))
          }
      </MDBTableBody>
    </MDBTable>
        </div>
    </div>
  )
}

export default Admin