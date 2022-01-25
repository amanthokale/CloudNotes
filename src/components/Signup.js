import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Signup(props){
  const[credentials,setCreadentials]=useState({
    name:"",
    email:"",
    password:""
  });
  let navigate = useNavigate();
  const onChange=(e)=>{
    setCreadentials({...credentials,[e.target.name]:e.target.value})
  }

  const submit= async (e)=>{
    e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.cpassword})
       });
       const json = await response.json();
       console.log(json);

      if(json.success){
          localStorage.setItem('token',json.authtoken);
          navigate("/");
          props.givealert("Successfully signed up","success");
       }
       else{
         props.givealert("Inbavalid credentials","danger");
       }

  }
  return(
    <>

    <form onSubmit={submit}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange}/>

    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword" className="form-label">Confirm password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>




    </>
  )
}
