import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import logo from '../../images/logo.png'
import './navbar.css'
export default function Navbar({userData , userlogOut}) {
  const [changeBtn, setchangeBtn] = useState(true)
  function register()
  {
    setchangeBtn(false);
  }
  function login()
  {
    setchangeBtn(true);
  }

  
  return <>
  <nav className ="navbar navbar-expand-lg navbar-dark shadow">
  <div className ="container">
    <Link className ="navbar-brand" to="/"><img alt='logo' src={logo}></img>Game Over</Link>
    <button className ="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className ="navbar-toggler-icon"></span>
    </button>
    <div className ="collapse navbar-collapse" id="navbarSupportedContent">
    {userData? <>    <ul className ="navbar-nav m-auto mb-2 mb-lg-0">
        <li className ="nav-item">
          <Link className ="nav-link" to="/">Home</Link>
        </li>
        <li className ="nav-item">
          <Link className ="nav-link" to="/allgames">All</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/platform/pc">Pc</Link></li>
            <li><Link className="dropdown-item" to="/platform/browser">Browsers</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            sort-by
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/sort-by/release-date">Release-date</Link></li>
            <li><Link className="dropdown-item" to="/sort-by/popularity">Popularity</Link></li>
            <li><Link className="dropdown-item" to="/sort-by/alphabetical">Alphabetical</Link></li>
            <li><Link className="dropdown-item" to="/sort-by/relevance">Relevance</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categories
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/cateogries/shooter">shooter</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/racing">Racing</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/sports">Sports</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/social">Social</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/open-world">Open World</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/zombie">Zombie</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/fantasy">Fantasy</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/action-rpg">Action Rpg</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/action">Action</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/flight">Flight</Link></li>
            <li><Link className="dropdown-item" to="/cateogries/battle-royale">Battle Royale</Link></li>
          </ul>
        </li>
      </ul> </> : null}
  
      <ul className ="navbar-nav ms-auto mb-2 mb-lg-0">
        {userData? <><li className='nav-item d-flex mx-3 align-items-center'>welcome <span className='text-info strong ms-2'>{ userData.first_name}</span></li>
        <li className ="nav-item">
          <span className ="nav-link logout" onClick={userlogOut}>Logout</span>
        </li></> : <> {changeBtn? null :<><li className ="nav-item">
          <Link className ="nav-link" to="/login" onClick={login}>Login</Link>
        </li></>}
        {changeBtn? <><li className ="nav-item">
          <Link className ="nav-link register" to='/register' onClick={register}>Join Free</Link>
        </li></> : null}
        </>}
     
       
      </ul>
    </div>
  </div>
</nav>
  
  </>
}
