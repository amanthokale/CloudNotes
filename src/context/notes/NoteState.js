import NoteContext from './noteContext';
import {useState} from 'react';


const NoteState = (props)=>{
const initialnotes = [
    {
        "_id": "61ec5acf077969725e6639de",
        "user": "61e9b3bcee7707205b06958f",
        "title": "First note",
        "description": "hui hui",
        "tag": "personal",
        "date": "2022-01-22T19:28:15.867Z",
        "__v": 0
    },
    {
        "_id": "61ec5af3077969725e6639e0",
        "user": "61e9b3bcee7707205b06958f",
        "title": "Second note",
        "description": "aaaaa",
        "tag": "social",
        "date": "2022-01-22T19:28:51.196Z",
        "__v": 0
    },
    {
        "_id": "61ec5b08077969725e6639e2",
        "user": "61e9b3bcee7707205b06958f",
        "title": "third note",
        "description": "bfsdddd",
        "tag": "na",
        "date": "2022-01-22T19:29:12.968Z",
        "__v": 0
    }
]

const [notes,setNotes]=useState(initialnotes);

return (
      <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
      </NoteContext.Provider>
    )
}


export default NoteState;
