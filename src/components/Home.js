import React,{ useContext ,useRef} from 'react';
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';
import Addnote from './Addnote';

const Home =(props)=>{

  return(
      <>
      <div>
<Notes givealert={props.givealert}/>

  </div>

    </>
  )

}

export default Home;
