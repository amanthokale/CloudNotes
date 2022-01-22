import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
     <Router>
    <>
    <Navbar/>
    <Routes>
  <Route exact path="/home" element={<Home/>}/>
  <Route exact path="/about" element={<About/>}/>
    </Routes>
    </>
     </Router>
  );
}

export default App;
