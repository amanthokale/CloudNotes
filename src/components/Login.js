import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';


export default function Login(props){
  const[credentials,setCreadentials]=useState({
    email:"",
    password:""
  });
  let navigate = useNavigate();

  const submit= async (e)=>{
    e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({email:credentials.email,password:credentials.password})
       });
       const json = await response.json();
       console.log(json);

       if(json.success){
          localStorage.setItem('token',json.authtoken);
          navigate("/home");
          props.givealert("Login Successfully","success");
       }
       else{
         props.givealert("Invalid credentials","danger");
       }
  }


const onChange=(e)=>{
  setCreadentials({...credentials,[e.target.name]:e.target.value})
}
  return(
    <>
    <h2 className="text-center my-5">CloudNotes - Login</h2>
    <form onSubmit={submit}>
  <div className="mb-3 my-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Login</button>
  <Link className="btn btn-success mx-2" to="/signup" role="button">Signup</Link>
</form>


    </>
  )
}
