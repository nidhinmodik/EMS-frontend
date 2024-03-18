import React, { useEffect, useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function View() {
  const base_url = 'http://localhost:8000'

  const [employeeData,setEmployeeData]=useState({})
  const {id}=useParams()
  console.log(id);
  //get a particular employee details
  const getEmployee=async(id)=>{
    const result = await axios.get(`${base_url}/get-an-employee/${id}`)
    console.log(result.data.employees);//object
    setEmployeeData(result.data.employees)
  }
  console.log(employeeData);
  useEffect(()=>{
    getEmployee(id)
  },[])

  return (
    <div>
      <h3 className='text-center m-4 text-primary'>View Employee Details</h3>
      <div className="container p-5 m-5 d-flex justify-content-between">
      <MDBCard style={{width:'500px'}}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle className='title mb-5 text-center text-primary'>Employee Details</MDBCardTitle>
        {
        <MDBCardText>
        <MDBListGroup style={{ minWidth: '22rem' }} light small>
      <MDBListGroupItem noBorders className='bg-light text-primary px-3'>Employee ID : {employeeData.id}</MDBListGroupItem>
      <MDBListGroupItem noBorders className='bg-light text-primary px-3'>Full Name : {employeeData.name}</MDBListGroupItem>
      <MDBListGroupItem noBorders className='bg-light text-primary px-3'>Age : {employeeData.age}</MDBListGroupItem>
      <MDBListGroupItem noBorders className='bg-light text-primary px-3'>Designation : {employeeData.designation}</MDBListGroupItem>
      <MDBListGroupItem noBorders className='bg-light text-primary px-3'>Salary : {employeeData.salary}</MDBListGroupItem>
    </MDBListGroup>
        </MDBCardText>
        }
      </MDBCardBody>
    </MDBCard>
    <div className='image card text-center' style={{width:'300px'}}>
      <img width={'100%'} src="https://icon-library.com/images/user-png-icon/user-png-icon-19.jpg" alt="" />
    </div>
      </div>
      <div className='button text-center mb-5'>
      <MDBBtn href='/' className='btn btn-primary m-2'>Back to Home</MDBBtn>
      </div>
    </div>
  )
}

export default View