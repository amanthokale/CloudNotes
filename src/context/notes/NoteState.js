import NoteContext from './noteContext';
import {useState} from 'react';


const NoteState = (props)=>{
  const host = "http://localhost:5000"
const initialnotes = [];
const [notes,setNotes]=useState(initialnotes);

// GET ALL NOTES
const getnotes=async ()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOWIzYmNlZTc3MDcyMDViMDY5NThmIn0sImlhdCI6MTY0Mjc3NDc2Nn0.X6TYUZclLE8VDx157SdGP7VxhfkNflvC0Rq8udOqKgs'
     },
   });
const json = await response.json();
setNotes(json);


}



// ADD A NOTE
const addNote=async (title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/addnote`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOWIzYmNlZTc3MDcyMDViMDY5NThmIn0sImlhdCI6MTY0Mjc3NDc2Nn0.X6TYUZclLE8VDx157SdGP7VxhfkNflvC0Rq8udOqKgs'
     },
     body: JSON.stringify({title,description,tag})
   });
const note = await response.json();
setNotes(notes.concat(note));

}

// DELETE A NOTE:
const deleteNote=async(id)=>{
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json',
       'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOWIzYmNlZTc3MDcyMDViMDY5NThmIn0sImlhdCI6MTY0Mjc3NDc2Nn0.X6TYUZclLE8VDx157SdGP7VxhfkNflvC0Rq8udOqKgs'
     },
   });
const json =await  response.json();


  const newNotes= notes.filter((note)=>{return note._id!==id});
  setNotes(newNotes)
}

// EDIT A NOTE
const editNote= async (id,title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
       'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOWIzYmNlZTc3MDcyMDViMDY5NThmIn0sImlhdCI6MTY0Mjc3NDc2Nn0.X6TYUZclLE8VDx157SdGP7VxhfkNflvC0Rq8udOqKgs'
     },
     body: JSON.stringify({title,description,tag})
   });
const json =await response.json();
let newNotes = JSON.parse(JSON.stringify(notes));

for (let index=0;index<newNotes.length;index++){
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
    }
  }
setNotes(newNotes);
}

return (
      <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getnotes}}>
        {props.children}
      </NoteContext.Provider>
    )
}


export default NoteState;
