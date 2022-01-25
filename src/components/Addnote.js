import React,{ useContext,useState } from 'react';
import noteContext from '../context/notes/noteContext';



const Addnote =()=>{
  const context = useContext(noteContext);
  const {addNote}= context;

const [note,setNote]=useState({title:"",description:"",tag:""})

if(note.title===""){
  var submit=(e)=>{
    e.preventDefault();
  }
}
else{
  submit=(e)=>{
  addNote(note.title,note.description,note.tag);
    e.preventDefault();
    setNote({title:"",description:"",tag:""})
  }
}
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  return(
      <>
        <div className="container my-5">
        <h2>Add a Note</h2>
        <form className="">
  <div className="form-group my-2">
    <label htmlFor="Title">Title</label>
    <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input value={note.description} type="text" className="form-control" id="description" name="description" placeholder="Enter a Description" onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group">
    <label htmlFor="tag">Description</label>
    <input value={note.tag} type="text" className="form-control" id="tag" name="tag" placeholder="Enter Tags" onChange={onChange} minLength={5} required/>
  </div>

  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-2" onClick={submit}>Add Note</button>
</form>

</div>






    </>
  )

}

export default Addnote;
