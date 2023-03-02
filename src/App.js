import './App.css';
import {
  Link,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Spinner, Navbar, Nav, Button, Container } from 'react-bootstrap'
import Wallet from './Components/Wallet';


function App() {
  return (
    <div>
      <Wallet/>
    </div>
  );
  }


export default App;
