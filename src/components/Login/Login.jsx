import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Register/register.css';
import Joi from 'joi'
import $ from 'jquery'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
export default function Login({saveUserData}) {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  
const [joiError, setjoiError] = useState([]);
const [apiError, setapiError] = useState('');
const [isLoading, setisLoading] = useState(false);



  function getUserData(e) {
    let User = {...user};
     User[e.target.id] = e.target.value
     setUser(User);
     $(e.target).next().html(null)
  }

  function submitForm(e)
  {
    setisLoading(true)
    e.preventDefault();
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
      password: Joi.string().required(),
    })
  const joiResponse =  schema.validate(user,{abortEarly:false});
  if(joiResponse.error)
  {
    setisLoading(false)
    setjoiError(joiResponse.error.details);
  }
  else
  {
    sendApidata();
  }
 
  }

  async function sendApidata()
  {
    let {data} =  await axios.post('https://route-egypt-api.herokuapp.com/signin', user);
    if(data.message === 'success')
    {
      localStorage.setItem('usertoken' , data.token);
      saveUserData();
      navigate('/');
    }
    else
    {
      setisLoading(false)
      setapiError(data.message);
    }
  }

  return <>
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-6 gaming-logo"></div>
        <div className="col-md-6 form-body text-center">
          <div className='py-5 px-2'>
            <img className='w-25' src={logo} alt="" />
            <h4 className=' mb-3'>Log in to GameOver</h4>
            <form onSubmit={submitForm}>
              <div className='mt-4 position-relative'><input type="email" className='form-control' placeholder='Email Address' id='email' onChange={getUserData} />
              <small className='text-danger error-form position-absolute start-0'>{joiError.filter((error)=> error.context.label == 'email')[0]?.message}</small>
              </div>
              <div className='mt-4 position-relative'><input type="password" className='form-control' placeholder='Password' id='password' onChange={getUserData} />
              <small className='text-danger error-form position-absolute start-0'>{joiError.filter((error)=> error.context.label == 'password')[0]?.message}</small>
              </div>
              <small className='text-danger error-form'>{apiError.length == 0? null : apiError}</small>
              <button className='form-btn btn mt-4'>{isLoading? <i className='fas fa-spinner fa-spin'></i>:'Sign in'}</button>
              <hr />
              <h6 className='strong'>Don't have account? <Link to={'/register'}>sign up<i className="fas fa-chevron-right small"></i></Link></h6>
            </form>
          </div>


        </div>
      </div>
    </div>
  </>

}

