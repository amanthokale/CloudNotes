import React,{ useContext,useEffect,useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';


export default function Notes(){
  const context = useContext(noteContext);
  const {notes,getnotes,editNote}= context;
  useEffect(()=>{
    getnotes();
    // eslint-disable-next-line
  },[])

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote=(currentNote)=>{
    console.log("update note");
      ref.current.click();
      setNote({id:currentNote._id,etitle:currentNote.title ,edescription:currentNote.description ,etag:currentNote.tag});
      console.log(currentNote);
  }
  const submit=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }



  return(
    <>
    <Addnote/>

    <button ref={ref} id="hide" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

          <div className="container my-5">
          <form className="">
    <div className="form-group my-2">
      <label htmlFor="title">Title</label>
      <input  value={note.etitle} type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} minLength={5} required/>
    </div>
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <input  value={note.edescription} type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter a Description" onChange={onChange} minLength={5} required/>
    </div>
    <div className="form-group">
      <label htmlFor="tag">Tags</label>
      <input  value={note.etag} type="text" className="form-control" id="etag" name="etag" placeholder="Enter Tags" onChange={onChange} minLength={5} required/>
    </div>

  </form>

  </div>


          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={submit} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
    <h2>Your notes</h2>
    <div className="container mx-2">
    {notes.length===0 && "No notes to display"}
    </div>
    {notes.map((note)=>{
    return <Noteitem key={note._id} note={note} updateNote={updateNote}/>
    })}

    </div>





    </>
  )
}
