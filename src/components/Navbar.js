import React from 'react';
import {Link,useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar= (props)=>{
let navigate = useNavigate();
 let location = useLocation();

const logout=()=>{
  localStorage.removeItem('token');
  navigate("/");
  props.givealert("Logout Successfull","success");

}



  return(
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container-fluid">
  <Link className="navbar-brand" to="/">CloudNotes</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to="/home">Notes</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
      </li>
    </ul>
     {!localStorage.getItem('token')?null
    :<Link className="btn btn-primary mx-1" to="/" onClick={logout} role="button">LogOut</Link>}
  </div>
</div>
</nav>



    </>
  )
}


export default Navbar;
