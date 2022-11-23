import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import './register.css';
import Joi from 'joi'
import $ from 'jquery'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0
  })

  const [joiError, setjoiError] = useState([]);
  const [apiError, setapiError] = useState('');
  const [isLoading, setisLoading] = useState(false);


  function getUserData(e) {
    let User = { ...user };
    User[e.target.id] = e.target.value
    setUser(User);
    $(e.target).next().html(null)
  }

  function submitForm(e) {
    setisLoading(true)
    e.preventDefault();
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(20).required(),
      last_name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required(),
      age: Joi.number().min(16).max(80).required()
    })
    const joiResponse = schema.validate(user, { abortEarly: false });
    if (joiResponse.error) {
      setisLoading(false)
      setjoiError(joiResponse.error.details);
    }
    else {
      sendApidata();
    }

  }

  async function sendApidata() {
    let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user);
    if (data.message === 'success') {
      navigate('/login')
    }
 
    else {
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
            <h4 className=' mb-3'>Create My Account</h4>
            <form onSubmit={submitForm}>
              <div className="row">
                <div className="col-md-6">
                  <div className='position-relative'>
                    <input type="text" className='form-control' placeholder='First Name' onChange={getUserData} id='first_name' />
                    <small className='text-danger error-form position-absolute start-0'>{joiError.filter((error) => error.context.label == 'first_name')[0]?.message}</small>
                  </div>

                </div>
                <div className="col-md-6">
                  <div className='position-relative'><input type="text" className='form-control' placeholder='Last Name' id='last_name' onChange={getUserData} />
                    <small className='text-danger error-form position-absolute start-0'>{joiError.filter((error) => error.context.label == 'last_name')[0]?.message}</small>
                  </div>
                </div>
              </div>
              <div className='mt-4 position-relative'><input type="email" className='form-control' placeholder='Email Address' id='email' onChange={getUserData} />
                <small className='text-danger error-form position-absolute start-0'>{joiError.filter((error) => error.context.label == 'email')[0]?.message}</small>
              </div>
              <div className='mt-4 position-relative'><input type="number" className='form-control' placeholder='Age' id='age' onChange={getUserData} />
                <small className='text-danger error-form position-absolute start-0'>{joiError.filter((error) => error.context.label == 'age')[0]?.message}</small>
              </div>
              <div className='mt-4 position-relative'><input type="password" className='form-control' placeholder='Password' id='password' onChange={getUserData} />
                <small className='text-danger error-form position-absolute start-0'>{joiError.filter((error) => error.context.label == 'password')[0]?.message}</small>
              </div>
              <small className='text-danger error-form'>{apiError.length == 0 ? null : apiError}</small>
              <button className='form-btn btn mt-4'>{isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Create Account'}</button>
              <p className='text-muted small py-3 '>This site is protected by reCAPTCHA and the Google <a target={'_blank'} rel="noreferrer" href='https://policies.google.com/privacy'>Privacy Policy</a> and <a rel="noreferrer" target={'_blank'} href="https://policies.google.com/terms">Terms of services </a>apply</p>
              <hr />
              <h6 className='strong'>Already a Member? <Link to={'/login'}>Login<i className="fas fa-chevron-right small"></i></Link></h6>
            </form>
          </div>


        </div>
      </div>
    </div>
  </>

}

