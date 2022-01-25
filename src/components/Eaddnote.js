import React,{ useContext,useState } from 'react';
import noteContext from '../context/notes/noteContext';



const Addnote =(props)=>{
  const context = useContext(noteContext);
  const {addNote}= context;

const [note,setNote]=useState({title:"",description:"",tag:""})

if(note.title===""){
  var submit=(e)=>{
    e.preventDefault();
  }
}
else{
  var submit=(e)=>{
  addNote(note.title,note.description,note.tag);
    e.preventDefault();
  }
}
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  return(
      <>
        <div className="container my-5">
        <form className="">
  <div className="form-group my-2">
    <label htmlFor="Title">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="description" name="description" placeholder="Enter a Description" onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="tag">Description</label>
    <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Tags" onChange={onChange}/>
  </div>

</form>

</div>






    </>
  )

}

export default Addnote;
