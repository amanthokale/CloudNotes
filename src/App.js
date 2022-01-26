import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';





function App() {
  const [alert, setalert] = useState (null);
  const givealert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 3000);
  };
  return (
    <>
 <NoteState>
     <Router>
    <Navbar givealert={givealert}/>

    <Alert alert={alert}/>

    <div className="container">
    <Routes>
  <Route exact path="/home" element={<Home givealert={givealert}/>}/>
  <Route exact path="/about" element={<About/>}/>
  <Route exact path="/" element={<Login givealert={givealert}/>}/>
  <Route exact path="/signup" element={<Signup givealert={givealert}/>}/>
    </Routes>

    </div>

</Router>

 </NoteState>
    </>
  );
}

export default App;
