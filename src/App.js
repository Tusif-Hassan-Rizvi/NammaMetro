import './App.css';
import './css/Station.css'
import Selectstation from './components/Selectstaion'
import Selectroute from './components/Selectroutes'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import { useState } from 'react';

function App() {
  const [from, setFrom]=useState("");
  const [to, setTo]=useState("")

  function stationinfo(data){
    setFrom(data.from);
    setTo(data.to);
  }
  return (
    <Router basename="/NammaMetro">

      <Routes>
        <Route exact path='/' element={<Selectroute from={from} to={to} />}></Route>
        <Route path="/selectstation" element={<Selectstation stationinfo={stationinfo} />}></Route>
      </Routes>

    </Router>

  );
}

export default App;
